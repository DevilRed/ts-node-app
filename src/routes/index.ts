import { Router, Request } from 'express';
const router = Router();

router.get('/', (req:Request, res) => {
  res.send('uy');
});

router.get('/add', (req:Request, res) => {
  res.send('add form');
});

export default router;
