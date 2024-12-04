import express, { Request, Response } from 'express'
const router = express.Router()
import authRouter from './auth'
import authenticate, { userTypes } from '../middlewares/auth'

const test_router = async (_req: Request, res: Response): Promise<void> => {
    res.json({ key: "this is a test router" })
}
const test_auth = async (_req: Request, res: Response): Promise<void> => {
    res.json({ key: "this is a test Auth" })
}

const { REGULAR, ADMIN } = userTypes

router.get('/test', test_router)
router.use('/auth', authRouter)

router.get('/test', authenticate([ADMIN, REGULAR]), test_auth)

export default router