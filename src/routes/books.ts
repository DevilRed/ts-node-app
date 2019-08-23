import { Router } from 'express';

const router = Router();

import { booksController } from '../controllers/booksController';

router.get('/', booksController.index);
router.get('/add', booksController.renderFormBook);
router.post('/add', booksController.saveBook);

router.get('/edit/:id', booksController.editBook);
router.post('/edit/:id', booksController.editBook);

router.post('/delete/:id', booksController.deleteBook);

export default router;
