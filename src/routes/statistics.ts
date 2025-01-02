import express from 'express'
import { getUsersStatistics, getPostStatistics, getPetStatistics, getProductStatistics } from '../controllers/Statistics'
import authenticate, { userTypes } from '../middlewares/auth'

const { ADMIN } = userTypes
const router = express.Router()

router.get('/users', authenticate([ADMIN]), getUsersStatistics)
router.get('/posts', authenticate([ADMIN]), getPostStatistics)
router.get('/pets', authenticate([ADMIN]), getPetStatistics)
router.get('/products', authenticate([ADMIN]), getProductStatistics)


export default router
