import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import { limiter } from '../utils/limiter';
import { router as usersAdmin } from '../routes/adminRoutes/usersAdmin';
import { router as categoriesAdmin } from '../routes/adminRoutes/categoriesAdmin';
import { checkAuth } from '../middleware/auth';
import { adminCors } from '../utils/cors';
import cors from 'cors';
// import {
//   CloudinaryResponse,
//   cloudinaryUploadOptions,
//   uploadToCloudinary,
// } from '../utils/uploadToCloudinary';

export const startServer = (port: number) => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(limiter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
  });

  // Routes
  app.use('/api/v1/admin', usersAdmin);
  app.use('/api/v1/admin/categories', categoriesAdmin);

  // app.post('/', uploadSingle, async (req, res) => {
  //   const file = req.file as Express.Multer.File;

  //   if (!file) {
  //     return res.status(400).send('No file uploaded');
  //   }

  //   let result: CloudinaryResponse | undefined;

  //   result = await uploadToCloudinary(file.path, cloudinaryUploadOptions);

  //   if (!result) {
  //     return res.status(500).send('Error uploading file');
  //   }

  //   const { original_filename } = result;

  //   const filePath = `uploads/temp/${original_filename}`;

  //   fs.unlink(filePath, err => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //   });

  //   res.send(result);
  // });

  // Start server
  app.listen(port, () => {
    console.log('Server started on http://localhost:' + port);
  });
};
