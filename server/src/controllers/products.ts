import { Request, Response } from 'express';
import { getAll as getAllProducts } from '../services/products';

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
