import express from 'express'
import { getUsers, manageStatus } from '../controllers/user'
import authenticate, { userTypes } from '../middlewares/auth'
import getAllUsersController from '../controllers/user/getAllUsersController'

const { ADMIN } = userTypes
const router = express.Router()

router.get('/', authenticate([ADMIN]), getUsers)
router.get('/get-all', getAllUsersController)
router.post('/manage-status', authenticate([ADMIN]), manageStatus)

export default router