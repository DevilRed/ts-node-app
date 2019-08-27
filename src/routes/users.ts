import { Router } from 'express';
const router = Router();

import { usersController } from '../controllers/UsersController';

router.get('/', usersController.index);
router.get('/add', usersController.add);
router.post('/add', usersController.add);
router.get('/login', usersController.login);
router.post('/login', usersController.login);

export default router;
