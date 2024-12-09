import express from 'express'
import { getAllPetTypes, addNewPetType, deletePetType, updatePetType } from '../controllers/petType'
import authenticate, { userTypes } from '../middlewares/auth'
const { ADMIN, REGULAR } = userTypes

const router = express.Router()

router.get('/', authenticate([ADMIN, REGULAR]), getAllPetTypes)
router.post('/', authenticate([ADMIN]), addNewPetType)
router.put('/:id', authenticate([ADMIN]), updatePetType)
router.delete('/:id', authenticate([ADMIN]), deletePetType)

export default router