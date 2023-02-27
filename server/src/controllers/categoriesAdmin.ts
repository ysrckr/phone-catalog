import type { Request, Response } from 'express';
import { create as createCategory } from '../services/categories';

export const create = async (req: Request, res: Response) => {
  const { name } = req.body;

  const newCategory = {
    name,
  };

  try {
    const category = await createCategory(newCategory);
    console.log(category);
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
