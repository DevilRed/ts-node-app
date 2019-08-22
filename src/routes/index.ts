import { Router, Request } from 'express';
import { indexController } from '../controllers/indexController';

const router = Router();

router.get('/', indexController.index);

router.get('/add', (req: Request, res) => {
  res.send('add form');
});

export default router;
