import express from 'express'
import { login, logout, signup } from '../controllers/auth'

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.get('/logout', logout)

export default router