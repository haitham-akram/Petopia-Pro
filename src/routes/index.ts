import express, { Request, Response } from 'express'
import PostsRouter from './User/Posts/addNewPost'
const router = express.Router()

const test_router = async (req: Request, res: Response): Promise<void> => {
    res.json({ key: "this is a router test" })
}

router.get('/test', test_router)
router.use('/posts', PostsRouter)

export default router