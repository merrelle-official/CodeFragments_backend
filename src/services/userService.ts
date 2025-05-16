import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

type UpdateUserPayload = Partial<Pick<User,
  'firstname' | 'lastname' | 'bio' | 'gitlink' | 'instlink' | 'linkedinlink' | 'tglink' | 'sitelink'
>>

export const getUserByUsernameService = async (username: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                firstname: true,
                lastname: true,
                bio: true,
                gitlink: true,
                instlink: true,
                linkedinlink: true,
                tglink: true,
                sitelink: true,
            },
        });
        return user;
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw new Error('User not found');
    }
}

export const updateUserByIdService = async (id: number, data: UpdateUserPayload) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        firstname: true,
        lastname: true,
        bio: true,
        gitlink: true,
        instlink: true,
        linkedinlink: true,
        tglink: true,
        sitelink: true,
      },
    })
    return updatedUser
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error)
    throw new Error('Не удалось обновить данные пользователя')
  }
}