import express from 'express'
import authenticate, { userTypes } from '../middlewares/auth'
import { bookmark, getBookmarks } from '../controllers/bookmark'

const { ADMIN, REGULAR } = userTypes

const router = express.Router()

router.get('/', authenticate([ADMIN, REGULAR]), getBookmarks)
router.post('/', authenticate([ADMIN, REGULAR]), bookmark)


export default router