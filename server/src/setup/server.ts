import express from 'express';
import { router as adminRouter } from '../routes/admin';
import { router as categoriesRouter } from '../routes/categories';
import { adminCors } from '../utils/cors';

export const startServer = (port: number) => {
  const app = express();

  app.use(express.json());

  app.use('/api/v1/admin', adminCors, adminRouter);
  app.use('/api/v1/categories', categoriesRouter);

  app.listen(port, () => {
    console.log('Server started on http://localhost:' + port);
  });
};
