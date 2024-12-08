import express, { Request, Response } from 'express'
import authenticate, { userTypes } from '../middlewares/auth'
import authRouter from './auth'
import petRouter from './pet'


const router = express.Router()
const test_router = async (_req: Request, res: Response): Promise<void> => {
    res.json({ key: "this is a test router" })
}
const test_auth = async (_req: Request, res: Response): Promise<void> => {
    res.json({ key: "this is a test Auth" })
}

const { REGULAR, ADMIN } = userTypes

router.get('/test', test_router)
router.use('/auth', authRouter)
router.use('/pet', petRouter)

router.get('/test', authenticate([ADMIN, REGULAR]), test_auth)

export default router