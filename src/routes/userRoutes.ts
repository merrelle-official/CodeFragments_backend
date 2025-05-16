import { Router } from 'express';
import { 
    getUserByUsername,
    updateUserById
} from '../controllers/userController';
import { authenticateToken } from '../middlewares/jwtMiddleware';

const router: Router = Router();


router.get('/user/username/:username', getUserByUsername);
router.patch('/user/update', authenticateToken, updateUserById)


export default router;
