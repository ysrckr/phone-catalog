import express from 'express';
import { checkAuth } from '../middleware/auth';
import { router as adminRouter } from '../routes/admin';
import { router as categoriesAdminRouter } from '../routes/categoriesAdmin';
import { adminCors } from '../utils/cors';

export const startServer = (port: number) => {
  const app = express();

  app.use(express.json());

  app.use('/api/v1/admin', adminCors, adminRouter);
  app.use(
    '/api/v1/admin/categories',
    adminCors,
    checkAuth,
    categoriesAdminRouter,
  );

  app.listen(port, () => {
    console.log('Server started on http://localhost:' + port);
  });
};
