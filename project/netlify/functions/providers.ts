<content>import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const prisma = new PrismaClient();

// Esquema de validación para proveedores
const providerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  sectors: z.array(z.enum(['energy', 'communications', 'alarms'])),
  status: z.enum(['active', 'pending', 'inactive']),
  provinces: z.array(z.string())
});

// Middleware de autenticación y autorización
const authenticateAdmin = async (authHeader: string | undefined) => {
  if (!authHeader) {
    throw new Error('No token provided');
  }

  const token = authHeader.replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId }
  });

  if (!user || user.type !== 'admin') {
    throw new Error('Unauthorized');
  }

  return user;
};

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  try {
    // Verificar autenticación para todas las rutas excepto OPTIONS
    if (event.httpMethod !== 'OPTIONS') {
      await authenticateAdmin(event.headers.authorization);
    }

    const path = event.path.replace('/.netlify/functions/providers/', '');
    const method = event.httpMethod;
    const body = event.body ? JSON.parse(event.body) : {};

    switch (true) {
      // Listar proveedores
      case method === 'GET' && !path:
        const providers = await prisma.provider.findMany();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(providers)
        };

      // Obtener un proveedor específico
      case method === 'GET' && path.match(/^[a-zA-Z0-9-]+$/):
        const provider = await prisma.provider.findUnique({
          where: { id: path }
        });

        if (!provider) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Proveedor no encontrado' })
          };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(provider)
        };

      // Crear proveedor
      case method === 'POST' && !path:
        const validatedData = providerSchema.parse(body);
        const newProvider = await prisma.provider.create({
          data: {
            ...validatedData,
            operations: 0,
            revenue: 0
          }
        });

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(newProvider)
        };

      // Actualizar proveedor
      case method === 'PUT' && path.match(/^[a-zA-Z0-9-]+$/):
        const validatedUpdateData = providerSchema.parse(body);
        const updatedProvider = await prisma.provider.update({
          where: { id: path },
          data: validatedUpdateData
        });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(updatedProvider)
        };

      // Eliminar proveedor
      case method === 'DELETE' && path.match(/^[a-zA-Z0-9-]+$/):
        await prisma.provider.delete({
          where: { id: path }
        });

        return {
          statusCode: 204,
          headers
        };

      // Actualizar estadísticas del proveedor
      case method === 'PUT' && path.match(/^[a-zA-Z0-9-]+\/stats$/):
        const providerId = path.split('/')[0];
        const { operations, revenue } = body;

        const updatedStats = await prisma.provider.update({
          where: { id: providerId },
          data: {
            operations: operations || 0,
            revenue: revenue || 0
          }
        });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(updatedStats)
        };

      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Ruta no encontrada' })
        };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Datos de proveedor inválidos',
          details: error.errors 
        })
      };
    }

    if (error instanceof Error && error.message === 'Unauthorized') {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: 'No autorizado' })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error interno del servidor' })
    };
  }
};</content>