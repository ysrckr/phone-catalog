import type { Request, Response } from 'express';
import { create as createProduct } from '../services/products';
import {uploadToCloudinary, cloudinaryDefaultUploadOptions } from '../utils/uploadToCloudinary';

export const create = async (req: Request, res: Response) => {
  const { name, description, price, quantity, colors, sizes, category } =
    req.body;
  const images = req.files as Express.Multer.File[];

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
    const imagePaths = images.map(image => image.path);
    const imagesCloudinary: string[] = [];
    try {
      imagePaths.forEach(async path => {
        const result = await uploadToCloudinary(path, cloudinaryDefaultUploadOptions);
        if (!result) {
          return res.status(500).json({ error: 'Error uploading file' });
        }
        imagesCloudinary.push(result.secure_url);
      });

      const product = await createProduct({
        name,
        colors,
        sizes,
        description,
        price: Number(price),
        quantity: Number(quantity),
        images: imagesCloudinary,
        categoryId: category,
      });
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
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
