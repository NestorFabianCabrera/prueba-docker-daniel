import { Router, Request, Response } from 'express';
import { Pool } from 'pg';
import { cacheService } from '../services/cache';

const router = Router();
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

const CACHE_KEY = 'productos:all';

// Definir tipos para las rutas
type RouteHandler = (req: Request, res: Response) => Promise<void>;

const getProductos: RouteHandler = async (req, res) => {
  try {
    const cachedProductos = await cacheService.get(CACHE_KEY);
    if (cachedProductos) {
      res.json(JSON.parse(cachedProductos));
      return;
    }

    const productos = await pool.query('SELECT * FROM productos');
    await cacheService.set(CACHE_KEY, JSON.stringify(productos.rows));
    res.json(productos.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

const createProducto: RouteHandler = async (req, res) => {
  const { nombre, precio, stock, categoria } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO productos (nombre, precio, stock, categoria) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, precio, stock, categoria]
    );
    await cacheService.del(CACHE_KEY);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

const deleteProducto: RouteHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM productos WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    await cacheService.del(CACHE_KEY);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

router.get('/', getProductos);
router.post('/', createProducto);
router.delete('/:id', deleteProducto);

export default router; 