import { Request, Response } from "express";
import { 
    registerUser,
    loginUser, 
    getMeUser
} from "../services/authService";

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const user = await registerUser(username, email, password);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        res.status(400).json({ error: err instanceof Error ? err.message : "An unknown error occurred" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginUser(email, password);
        res.json({ token, user });
    } catch (err) {
        res.status(401).json({ error: err instanceof Error ? err.message : "An unknown error occurred" });
    }
};

export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const user = await getMeUser(req.userId);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err instanceof Error ? err.message : "An unknown error occurred" });
    }
};


