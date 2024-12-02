import express, { Request, Response } from 'express'
const router = express.Router()
import authRouter from './auth'

const test_router = async (req: Request, res: Response): Promise<void> => {
    res.json({ key: "this is a router test" })
}

router.get('/test', test_router)
router.use('/auth', authRouter)

export default router