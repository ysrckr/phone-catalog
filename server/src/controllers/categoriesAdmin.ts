import type { Request, Response } from 'express';
import { create as createCategory } from '../services/categories';
import { uploadToCloudinary, cloudinaryUploadOptions } from '../utils/uploadToCloudinary';


export const create = async (req: Request, res: Response) => {
  const { name } = req.body.body;
  const image = req.file;

  if (!name) {
    return res.status(400).json({ error: 'Missing name' });
  }

  if (image) {
    const { path } = image;
    const result = await uploadToCloudinary(path, cloudinaryUploadOptions);
    const newCategory = {
      name,
      image: result?.secure_url,
    };
    try {
      const category = await createCategory(newCategory);
      return res.status(201).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  try {
    const category = await createCategory({ name });
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

