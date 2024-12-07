import express from 'express'
import { login, logout, newOtp, signup, verifyUser, forgetPassword, resetPassword } from '../controllers/auth'

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.get('/logout', logout)
router.post('/new-otp', newOtp)
router.post('/verify', verifyUser)
router.post('/forgot-password',forgetPassword)
router.post('/reset-password/:token',resetPassword)

export default router