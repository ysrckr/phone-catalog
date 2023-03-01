import type { Request, Response } from 'express';
import { create as createCategory } from '../services/categories';
import { upload } from '../setup/fileUpload';

export const create = async (req: Request, res: Response) => {
  const { name } = req.body.body;
  const image = req.file;

  if (!name) {
    return res.status(400).json({ error: 'Missing name' });
  }

  if (image) {

  }

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

