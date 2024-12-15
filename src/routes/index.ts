import express from 'express'
import authRouter from './auth'
import petRouter from './pet'
import petTypeRouter from './petType'
import PostsRouter from './User/Posts'
import CommentsRouter from './User/Comments'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/pet', petRouter)
router.use('/pet-type', petTypeRouter)

// Posts Routes
router.use('/posts', PostsRouter)

// Comments Routes
router.use('/comments', CommentsRouter)

export default router