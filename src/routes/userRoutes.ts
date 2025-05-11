import { Router } from 'express';
import { 
    getUserByUsername
} from '../controllers/userController';
import { authenticateToken } from '../middlewares/jwtMiddleware';

const router: Router = Router();


router.get('/user/username/:username', getUserByUsername);


export default router;
