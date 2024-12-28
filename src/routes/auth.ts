import express from 'express'
import { login, logout, newOtp, signup, verifyUser, forgetPassword, resetPassword, passport } from '../controllers/auth'


const router = express.Router()


router.post('/login', login)
router.post('/signup', signup)
router.get('/logout', logout)
router.post('/new-otp', newOtp)
router.post('/verify', verifyUser)
router.post('/forgot-password', forgetPassword)
router.post('/reset-password/:token', resetPassword)

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login", session: false }),
    (req, res) => {
        const { token } = req.user as { token: string };
        res.cookie('token', token, { httpOnly: true }).json({ message: 'Logged in successfully' })
    }
);

export default router