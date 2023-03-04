import type { Request, Response } from 'express';
import fs from 'fs';
import { create as createCategory } from '../services/categories';
import {
  cloudinaryDefaultUploadOptions,
  uploadToCloudinary,
} from '../utils/uploadToCloudinary';

export const create = async (req: Request, res: Response) => {
  const { name } = req.body;
  const image = req.file;

  if (!name) {
    return res.status(400).json({ error: 'Missing name' });
  }

  if (image) {
    const { path } = image;
    try {
      const result = await uploadToCloudinary(path, cloudinaryDefaultUploadOptions);

      if (!result) {
        return res.status(500).json({ error: 'Error uploading file' });
      }

      const newCategory = {
        name,
        image: result.secure_url,
      };
      const category = await createCategory(newCategory);

      const filePath = `uploads/temp/${result.original_filename}`;

      fs.unlink(filePath, err => {
        if (err) {
          console.error(err);
          return;
        }
      });
      return res.status(201).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  try {
    const category = await createCategory({
      name,
    });
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
