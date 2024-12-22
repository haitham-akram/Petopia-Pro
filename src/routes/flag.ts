import express from 'express'
import authenticate, { userTypes } from '../middlewares/auth'
import { getFlags, addFlag, deleteFlag } from '../controllers/flag'


const { ADMIN, REGULAR } = userTypes

const router = express.Router();

router.get('/', authenticate([ADMIN]), getFlags)
router.post('/', authenticate([ADMIN, REGULAR]), addFlag)
router.delete('/', authenticate([ADMIN]), deleteFlag)

export default router