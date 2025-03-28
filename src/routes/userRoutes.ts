import { Router } from 'express';
import { 
    getUsers, 
    getOneUser, 
    updateUser, 
    deleteUser 
} from '../controllers/userController';
import { authenticateJWT } from '../middlewares/jwtMiddleware';

const router: Router = Router();

router.get('/users', getUsers);
router.get('/user/:id', authenticateJWT, getOneUser);
router.put('/user/:id', authenticateJWT, updateUser);
router.delete('/user/:id', authenticateJWT, deleteUser);

export default router;
