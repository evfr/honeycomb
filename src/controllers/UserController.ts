import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/UserService';
import {iUser} from '../types/types';

const MY_SECRET = 'mySecret';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public signUp = async(req: Request, res: Response): Promise<void> => {
    const { name, pass, email } = req.body;
    if (!name || !pass ||!email) {
      res.status(400).json({ message: 'Bad request. missing field' });
    }

    const newUser: iUser | null = await this.userService.createUser(name, pass, email);
    res.json(newUser);
  };

  public login =  async(req: Request, res: Response): Promise<void> => {
    const { name, pass } = req.body;
    if (!name || !pass) {
      res.status(400).json({ message: 'Bad request. missing field' });
    }
  
    const user: iUser | null = await this.userService.getUserByNameAndPass(name, pass);
    if (!user) {
      res.status(400).json({ message: 'Authentication failed. User not found.' });
    } else {
      const token = jwt.sign({ user }, MY_SECRET, { expiresIn: '1d' });
      res.json({ token });
    }
  };

  public authenticate =  async(req: Request, res: Response, next: any): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, MY_SECRET, (err: any, user: any) => {
        if (err) {
          return res.sendStatus(403);
        }
        (req as any).user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
}

export default UserController;