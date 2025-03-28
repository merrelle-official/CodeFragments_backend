import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (username: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    });
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "12h" });

    return { token, userId: user.id, username: user.username, userEmail: user.email };
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};
