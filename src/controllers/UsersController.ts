import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

class UsersController {
  public async index(req: Request, res: Response): Promise<void> {
    const users: IUser[] = await User.find();
    res.render('users/index', { title: 'Users index', users});
  }

  public async add(req: Request, res: Response): Promise<void> {
    if (req.method === 'POST') {
      const { name, email, password } = req.body;
      const newUser = new User({name, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      res.redirect('/users');
    } else {
      res.render('users/add', { title: 'Add a user'});
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    if (req.method === 'POST') {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        const isPasswordMatching = await user.comparePassword(password);
        if (isPasswordMatching) {
          res.send('ok, you are done');
        } else {
          res.send('try again');
        }
      }
    } else {
      res.render('users/login', { title: 'User Login'});
    }
  }
}
export const usersController = new UsersController();
