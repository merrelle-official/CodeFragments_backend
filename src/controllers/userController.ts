import { Request, Response, NextFunction, RequestHandler } from 'express';
import { 
    getUsersService,
    getOneUserService,
    updateUserService,
    deleteUserService,
    getUserByNameService
} from '../services/userService';

export const getUsers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await getUsersService();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching users' });
    }
};

export const getOneUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getOneUserService(parseInt(req.params.id, 10));
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

export const updateUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await updateUserService(parseInt(req.params.id, 10), req.body);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating user' });
  }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await deleteUserService(parseInt(req.params.id, 10));
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting user' });
  }
};

export const getUserByName: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getUserByNameService(req.params.name);
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