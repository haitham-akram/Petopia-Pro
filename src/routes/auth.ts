import express from 'express'
import { login, logout, newOtp, signup, verifyUser } from '../controllers/auth'

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.get('/logout', logout)
router.post('/new-otp', newOtp)
router.post('/verify', verifyUser)

export default router