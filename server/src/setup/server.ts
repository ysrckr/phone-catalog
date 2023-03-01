import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { checkAuth } from '../middleware/auth';
import { router as adminRouter } from '../routes/admin';
import { router as categoriesAdminRouter } from '../routes/categoriesAdmin';
import { adminCors } from '../utils/cors';
import { limiter } from '../utils/limiter';

export const startServer = (port: number) => {
  const app = express();

  // Middleware
  app.use(limiter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
  });

  const upload = multer({ dest: 'src/uploads/images/' });

  // Routes
  app.use('/api/v1/admin', adminCors, adminRouter);
  app.use(
    '/api/v1/admin/categories',
    adminCors,
    checkAuth,
    categoriesAdminRouter,
  );

  app.post('/', upload.single('images'), (req, res) => {
    const file = req.file as Express.Multer.File;

    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    cloudinary.uploader.upload(file.path, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(200).send(result);
    });
  });

  // Start server
  app.listen(port, () => {
    console.log('Server started on http://localhost:' + port);
  });
};
