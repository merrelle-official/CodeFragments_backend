import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUsersService = async () => {
  return await prisma.user.findMany();
};

export const getOneUserService = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const updateUserService = async (id: number, data: any) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUserService = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const getUserByNameService = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username },
  });
}
