import { Request, Response, NextFunction, RequestHandler } from 'express';
import { 
    getUserByUsernameService,
    updateUserByIdService,
} from '../services/userService';

interface AuthRequest extends Request {
  userId?: number;
}

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

export const updateUserById: RequestHandler = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId

  if (typeof userId !== 'number') {
    res.status(401).json({ error: 'Unauthorized or invalid token' })
    return
  }

  try {
    const updatedUser = await updateUserByIdService(userId, req.body)
    res.json(updatedUser)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error updating user' })
  }
}