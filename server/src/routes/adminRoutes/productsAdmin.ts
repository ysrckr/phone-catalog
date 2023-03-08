import express from 'express';
import multer from 'multer';

import { create as createProduct } from '../../controllers/productsAdmin';

const upload = multer({ dest: 'uploads/temp' });
const multipleUpload = upload.array('images');

export const router = express.Router();

router.post('/', multipleUpload, createProduct);