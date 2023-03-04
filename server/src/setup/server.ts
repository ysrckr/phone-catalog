import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import { checkAuth } from '../middleware/auth';
import { router as categoriesAdmin } from '../routes/adminRoutes/categoriesAdmin';
import { router as usersAdmin } from '../routes/adminRoutes/usersAdmin';
import { router as categories } from '../routes/categories/categories';
import { adminCors,clientCors } from '../utils/cors';
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

  // Routes
  app.use('/api/v1/categories', clientCors, categories);
  app.use('/api/v1/admin', adminCors, usersAdmin);
  app.use('/api/v1/admin/categories', adminCors, checkAuth, categoriesAdmin);

  // Start server
  app.listen(port, () => {
    console.log('Server started on http://localhost:' + port);
  });
};
