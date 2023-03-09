import multer from 'multer';
import { Request, NextFunction } from 'express';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/temp');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerOptions = {
  storage,
  fileFilter(req: Request, file: Express.Multer.File, next: NextFunction) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return next(new Error('Please upload an image'));
    }
    next();
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
};

export const upload = multer(multerOptions);
