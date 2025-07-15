import { Request, Response } from 'express';
import { connectDB } from '../utils/db';

export const getProducts = async (_: Request, res: Response) => {
  const db = await connectDB();
  const [rows] = await db.execute('SELECT * FROM product');
  res.json(rows);
};

export const createProduct = async (req: Request, res: Response) => {
  const { product_id, product_name } = req.body;
  const db = await connectDB();
  await db.execute('INSERT INTO product (product_id, product_name) VALUES (?, ?)', [product_id, product_name]);
  res.status(201).json({ message: 'Product created' });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { product_name } = req.body;
  const db = await connectDB();
  await db.execute('UPDATE product SET product_name = ? WHERE product_id = ?', [product_name, req.params.id]);
  res.json({ message: 'Updated' });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const db = await connectDB();
  await db.execute('DELETE FROM product WHERE product_id = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
};
