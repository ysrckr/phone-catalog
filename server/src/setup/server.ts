import express from 'express';
import { MemoryStore, rateLimit } from 'express-rate-limit';
import { checkAuth } from '../middleware/auth';
import { router as adminRouter } from '../routes/admin';
import { router as categoriesAdminRouter } from '../routes/categoriesAdmin';
import { adminCors } from '../utils/cors';

export const startServer = (port: number) => {
  const app = express();

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Send standard rate limit headers
    legacyHeaders: false, // Don't send legacy rate limit headers
    message: 'Too many requests from this IP, please try again later',
    store: new MemoryStore(),
  });

  // app.use(limiter);

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
