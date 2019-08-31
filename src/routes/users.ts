import { Router } from 'express';
const router = Router();
import passport from 'passport';

import { usersController } from '../controllers/UsersController';

router.get('/', usersController.index);
router.get('/add', usersController.add);
router.post('/add', usersController.add);
router.get('/login', usersController.login);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/users/login',
  failureFlash: true,
}));
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
