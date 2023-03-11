import type { Request, Response } from 'express';
import { create as createProduct } from '../services/products';

export const create = async (req: Request, res: Response) => {
  const { name, description, price, quantity, colors, sizes, category } =
    req.body;
  console.log('req.body', req.body);
  const images = req.files;
  console.log('req.file', req.file);
  console.log('req.files', req.files);
  console.log(images);
  if (
    !name ||
    !description ||
    !price ||
    !quantity ||
    !colors ||
    !sizes ||
    !category
  ) {
    return res.status(400).json({ error: 'Missing a value' });
  }

  if (images) {
    console.log('images', images);
  }

  try {
    const product = await createProduct({
      name,
      colors,
      sizes,
      description,
      price,
      quantity,
      images: [],
      categoryId: category,
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
