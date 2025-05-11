import { Request, Response, NextFunction, RequestHandler } from 'express';
import { 
    getUserByUsernameService,
} from '../services/userService';

export const getUserByUsername: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getUserByUsernameService(req.params.username);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching user' });
  }
};