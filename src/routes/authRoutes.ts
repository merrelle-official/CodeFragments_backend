import { Router } from "express";
import { register, login, getMe } from "../controllers/authController";
import { authenticateToken } from "../middlewares/jwtMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get('/me', authenticateToken, getMe);

export default router;
