import express from 'express'
import { getUsers, manageStatus } from '../controllers/user'
import authenticate, { userTypes } from '../middlewares/auth'

const { ADMIN } = userTypes
const router = express.Router()

router.get('/', authenticate([ADMIN]), getUsers)
router.post('/manage-status', authenticate([ADMIN]), manageStatus)

export default router