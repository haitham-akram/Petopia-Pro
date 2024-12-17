import express from 'express'
import authRouter from './auth'
import petRouter from './pet'
import petTypeRouter from './petType'
import followerRouter from './follower'
import PostsRouter from './User/Posts'
import CommentsRouter from './User/Comments'
import BookmarkRouter from './bookmark'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/pet', petRouter)
router.use('/pet-type', petTypeRouter)
router.use('/follower', followerRouter)
// Posts Routes
router.use('/posts', PostsRouter)
// Comments Routes
router.use('/comments', CommentsRouter)
router.use('/bookmark', BookmarkRouter)
export default router