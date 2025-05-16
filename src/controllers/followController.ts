import { Request, Response } from 'express';
import {
  followUser,
  getFollowCounts,
  getFollowers,
  getFollowing,
  isFollowing,
  unfollowUser,
} from '../services/followService';
import { AuthenticatedRequest } from '../middlewares/jwtMiddleware';

interface AuthRequest extends Request {
  userId?: number;
}

export const getUserFollowCounts = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const counts = await getFollowCounts(userId);
    res.json(counts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get follow counts' });
  }
};

export const getUserFollowers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const followers = await getFollowers(userId);
    res.json(followers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get followers' });
  }
};

export const getUserFollowing = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const following = await getFollowing(userId);
    res.json(following);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get following list' });
  }
};

export const followUserHandler = async (req: AuthRequest, res: Response): Promise<void> => {
  const followerId = req.userId;
  const followingId = parseInt(req.params.userId);

  if (!followerId) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  if (!followingId || isNaN(followingId)) {
    res.status(400).json({ error: 'Invalid user ID to follow' });
    return;
  }
 
  if (followerId === followingId) {
    res.status(400).json({ error: 'Cannot follow self' });
    return;
  }

  try {
    const result = await followUser(followerId, followingId);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const unfollowUserHandler = async (req: AuthRequest, res: Response): Promise<void> => {
  const followerId = req.userId;
  const followingId = parseInt(req.params.userId);

  if (!followerId) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  if (!followingId || isNaN(followingId)) {
    res.status(400).json({ error: 'Invalid user ID to unfollow' });
    return;
  }

  try {
    await unfollowUser(followerId, followingId);
    res.status(204).end();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const isFollowingHandler = async (req: AuthenticatedRequest, res: Response) => {
  const followerId = req.userId;

  if (followerId === undefined) {
    res.status(400).json({ error: 'User is not authenticated' });
    return 
  }

  const followingId = parseInt(req.params.userId, 10);

  if (isNaN(followingId)) {
    res.status(400).json({ error: 'Invalid userId' });
    return 
  }

  try {
    const isUserFollowing = await isFollowing(followerId, followingId);
    res.status(200).send(isUserFollowing);
    return
  } catch (error) {
    console.error('Error in isFollowingHandler:', error);
    res.status(500).json({ error: 'Failed to check follow status' });
    return 
  }
};