import express from 'express'
import authRouter from './auth'
import petRouter from './pet'
import petTypeRouter from './petType'
import PostsRouter from './User/Posts'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/pet', petRouter)
router.use('/pet-type', petTypeRouter)
router.use('/posts', PostsRouter)

export default router