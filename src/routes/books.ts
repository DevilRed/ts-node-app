import { Router } from 'express';
import multer from '../lib/multer';

const router = Router();

import { booksController } from '../controllers/booksController';

router.get('/', booksController.index);
router.get('/add', booksController.renderFormBook);
router.post('/add', booksController.saveBook);

router.get('/edit/:id', booksController.editBook);
router.post('/edit/:id', multer.single('image'), booksController.editBook);

router.post('/delete/:id', booksController.deleteBook);

router.get('/add_fake_data', booksController.addFakeData );

export default router;
