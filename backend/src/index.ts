import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import mongoose from 'mongoose';
import Redis from 'ioredis';
import productosRouter from './routes/productos';

const app = express();

app.use(cors());

app.use(express.json());

// Rutas
app.use('/api/productos', productosRouter);

const PORT = Number(process.env.PORT) || 4000;

const connectDB = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB conectado');

    // Conectar a PostgreSQL
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URI
    });
    await pool.query('SELECT 1');
    console.log('PostgreSQL conectado');

    // Conectar a Redis
    const redis = new Redis(process.env.REDIS_URI as string);
    await redis.ping();
    console.log('Redis conectado');

    // Iniciar servidor solo después de conectar
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar:', error);
    process.exit(1);
  }
};

connectDB(); 