import express from 'express'
import authRouter from './auth'
import petRouter from './pet'
import petTypeRouter from './petType'
import followerRouter from './follower'
import PostsRouter from './User/Posts'
import CommentsRouter from './User/Comments'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/pet', petRouter)
router.use('/pet-type', petTypeRouter)
<<<<<<< HEAD

// Posts Routes
=======
router.use('/follower', followerRouter)
>>>>>>> 8949781fc642d57a04e5101feee8adee78c5711e
router.use('/posts', PostsRouter)

// Comments Routes
router.use('/comments', CommentsRouter)

export default router