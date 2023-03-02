import express from 'express';
import multer from 'multer';
import { create as createCategory } from '../../controllers/categoriesAdmin';

const upload = multer({ dest: 'uploads/temp' });
const singleUpload = upload.single('image');

export const router = express.Router();

router.post('/', singleUpload, createCategory);
