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
}
export const usersController = new UsersController();
