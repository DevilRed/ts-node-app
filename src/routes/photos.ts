import { Router } from 'express';
import { photosController } from '../controllers/PhotosController';
import multer from '../lib/multer';

const router = Router();

router.route('/photos')
  // use middleware to upload image
  .post(multer.single('image'), photosController.savePhoto)
  ;

export default router;
