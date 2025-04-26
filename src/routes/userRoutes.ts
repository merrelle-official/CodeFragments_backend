import { Router } from 'express';
import { 
    getUsers, 
    getOneUser, 
    updateUser, 
    deleteUser 
} from '../controllers/userController';
import { authenticateToken } from '../middlewares/jwtMiddleware';

const router: Router = Router();

router.get('/users', getUsers);
router.get('/user/:id', authenticateToken, getOneUser);
router.put('/user/:id', authenticateToken, updateUser);
router.delete('/user/:id', authenticateToken, deleteUser);

export default router;
