<content>import { Provider } from '@prisma/client';

const API_URL = '/.netlify/functions/providers';

export const getProviders = async (): Promise<Provider[]> => {
  const response = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Error al obtener proveedores');
  }
  
  return response.json();
};

export const getProvider = async (id: string): Promise<Provider> => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Error al obtener el proveedor');
  }
  
  return response.json();
};

export const createProvider = async (data: Omit<Provider, 'id' | 'operations' | 'revenue'>): Promise<Provider> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Error al crear el proveedor');
  }
  
  return response.json();
};

export const updateProvider = async (id: string, data: Omit<Provider, 'id' | 'operations' | 'revenue'>): Promise<Provider> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Error al actualizar el proveedor');
  }
  
  return response.json();
};

export const deleteProvider = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Error al eliminar el proveedor');
  }
};

export const updateProviderStats = async (id: string, stats: { operations: number; revenue: number }): Promise<Provider> => {
  const response = await fetch(`${API_URL}/${id}/stats`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(stats)
  });
  
  if (!response.ok) {
    throw new Error('Error al actualizar las estadísticas del proveedor');
  }
  
  return response.json();
};</content>