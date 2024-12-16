import express from 'express'
import authenticate, { userTypes } from '../middlewares/auth'
import { followUser, getFollowers, getMutualFollowers, unfollowUser } from '../controllers/follower'

const { ADMIN, REGULAR } = userTypes

const router = express.Router()

router.get('/:userId', authenticate([ADMIN, REGULAR]), getFollowers)
router.get('/mutual/:userId', authenticate([ADMIN, REGULAR]), getMutualFollowers)
router.post('/', authenticate([ADMIN, REGULAR]), followUser)
router.delete('/', authenticate([ADMIN, REGULAR]), unfollowUser)

export default router