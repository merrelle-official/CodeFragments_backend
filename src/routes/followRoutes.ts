import { Router } from 'express';
import {
    followUserHandler,
  getUserFollowCounts,
  getUserFollowers,
  getUserFollowing,
  isFollowingHandler,
  unfollowUserHandler,
} from '../controllers/followController';
import { authenticateToken } from '../middlewares/jwtMiddleware';

const router = Router();

router.post('/follow/:userId', authenticateToken, followUserHandler);
router.delete('/unfollow/:userId', authenticateToken, unfollowUserHandler);
router.get('/isfollowing/:userId', authenticateToken, isFollowingHandler)

router.get('/followcounts/:userId', getUserFollowCounts);
router.get('/followers/:userId', getUserFollowers);
router.get('/following/:userId', getUserFollowing);

export default router;