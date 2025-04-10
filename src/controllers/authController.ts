import { Request, Response } from "express";
import { 
    registerUser,
    loginUser 
} from "../services/authService";

export const register = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
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
        const { token, user: {userId, username, userEmail, userRole} } = await loginUser(email, password);
        res.json({ token, user: { userId, username, userEmail, userRole } });
    } catch (err) {
        res.status(401).json({ error: err instanceof Error ? err.message : "An unknown error occurred" });
    }
};
