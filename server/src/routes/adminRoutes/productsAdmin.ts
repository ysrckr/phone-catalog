import express from 'express';
import { create as createProduct } from '../../controllers/productsAdmin';
import { upload } from '../../utils/multer';

export const router = express.Router();

const multipleUpload = upload.array('images');

router.post('/', multipleUpload, createProduct);
