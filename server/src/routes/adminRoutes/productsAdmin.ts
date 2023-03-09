import express from 'express';
import { create as createProduct } from '../../controllers/productsAdmin';
import { upload } from '../../utils/multer';


const multipleUpload = upload.array('images');

export const router = express.Router();

router.post('/', multipleUpload, createProduct);