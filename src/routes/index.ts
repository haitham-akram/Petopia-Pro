import express from 'express'
import authRouter from './auth'
import petRouter from './pet'
import petTypeRouter from './petType'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/pet', petRouter)
router.use('/pet-type', petTypeRouter)


export default router