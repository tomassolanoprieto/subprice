const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Rutas de autenticación
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, type } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        type
      }
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar usuario' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Error al iniciar sesión' });
  }
});

// Rutas protegidas
app.get('/bills', authenticateToken, async (req, res) => {
  try {
    const bills = await prisma.bill.findMany({
      where: { userId: req.user.userId }
    });
    res.json(bills);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener facturas' });
  }
});

app.post('/bills', authenticateToken, async (req, res) => {
  try {
    const bill = await prisma.bill.create({
      data: {
        ...req.body,
        userId: req.user.userId
      }
    });
    res.json(bill);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear factura' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});