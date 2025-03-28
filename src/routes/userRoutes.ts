import { Router } from 'express';
import { 
    getUsers, 
    createUser, 
    getOneUser, 
    updateUser, 
    deleteUser 
} from '../controllers/userController';

const router: Router = Router();

router.get('/users', getUsers);
router.get('/user/:id', getOneUser);
router.post('/user', createUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
