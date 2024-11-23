import express, { Request, Response } from 'express'
const router = express.Router()

const test_router = async (req: Request, res: Response): Promise<void> => {
    res.json({ key: "this is a router test" })
}

router.get('/test', test_router)

export default router