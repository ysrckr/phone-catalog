import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import { checkAuth } from '../middleware/auth';
import { router as adminRouter } from '../routes/admin';
import { router as categoriesAdminRouter } from '../routes/categoriesAdmin';
import { adminCors } from '../utils/cors';
import { limiter } from '../utils/limiter';
import {
  CloudinaryResponse,
  cloudinaryUploadOptions,
  uploadToCloudinary,
} from '../utils/uploadToCloudinary';

export const startServer = (port: number) => {
  const app = express();

  // Middleware
  app.use(limiter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  const upload = multer({ dest: 'uploads/temp' });
  const uploadSingle = upload.single('image');

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
  });

  // Routes
  app.use('/api/v1/admin', adminCors, adminRouter);
  app.use(
    '/api/v1/admin/categories',
    adminCors,
    checkAuth,
    categoriesAdminRouter,
  );

  app.post('/', uploadSingle, async (req, res) => {
    const file = req.file as Express.Multer.File;

    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    let result: CloudinaryResponse | undefined;

    result = await uploadToCloudinary(file.path, cloudinaryUploadOptions);

    if (!result) {
      return res.status(500).send('Error uploading file');
    }

    const { secure_url, original_filename } = result;

    const filePath = `uploads/temp/${original_filename}`;

    fs.unlink(filePath, err => {
      if (err) {
        console.error(err);
        return;
      }
    });

    res.send(result);
  });

  // Start server
  app.listen(port, () => {
    console.log('Server started on http://localhost:' + port);
  });
};
