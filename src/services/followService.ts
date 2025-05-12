import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type UserPreview = {
  id: number;
  username: string;
  firstname: string | null;
  lastname: string | null;
  bio: string | null;
};

export const getFollowCounts = async (userId: number) => {
  return {
    followersCount: await prisma.userFollower.count({
      where: { followingId: userId },
    }),
    followingCount: await prisma.userFollower.count({
      where: { followerId: userId },
    }),
  };
};

export const getFollowers = async (userId: number): Promise<UserPreview[]> => {
  const records = await prisma.userFollower.findMany({
    where: { followingId: userId },
    select: {
      follower: {
        select: {
          id: true,
          username: true,
          firstname: true,
          lastname: true,
          bio: true,
        },
      },
    },
  });

  return records.map(record => record.follower);
};

export const getFollowing = async (userId: number): Promise<UserPreview[]> => {
  const records = await prisma.userFollower.findMany({
    where: { followerId: userId },
    select: {
      following: {
        select: {
          id: true,
          username: true,
          firstname: true,
          lastname: true,
          bio: true,
        },
      },
    },
  });

  return records.map(record => record.following);
};

export const followUser = async (followerId: number, followingId: number) => {
    const existingFollow = await prisma.userFollower.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  
    if (existingFollow) {
      throw new Error('Already following this user');
    }
  
    return await prisma.userFollower.create({
      data: {
        followerId,
        followingId,
      },
    });
  };

  export const unfollowUser = async (followerId: number, followingId: number) => {
    return await prisma.userFollower.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  };