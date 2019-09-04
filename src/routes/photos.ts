import { Router } from 'express';
import { photosController } from '../controllers/PhotosController';
import multer from '../lib/multer';

const router = Router();

router.route('/photos')
  // use middleware to upload image
  .post(multer.single('image'), photosController.savePhoto)
  .get(photosController.getPhotos)
  ;

router.route('/photo/:id')
  .get(photosController.getPhoto)
  .delete(photosController.deletePhoto)
  ;

export default router;
