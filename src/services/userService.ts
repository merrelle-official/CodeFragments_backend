import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUserByUsernameService = async (username: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
            },
        });
        return user;
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw new Error('User not found');
    }
}
