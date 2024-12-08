import express from 'express'
import { addNewPet, getAllPetsByUser, getPetById, updatePet, deletePet } from '../controllers/pet'
import authenticate, { userTypes } from '../middlewares/auth'
const { ADMIN, REGULAR } = userTypes

const router = express.Router()

router.get('/', authenticate([ADMIN, REGULAR]), getAllPetsByUser)
router.post('/', authenticate([ADMIN, REGULAR]), addNewPet)
router.get('/:id', authenticate([ADMIN, REGULAR]), getPetById)
router.put('/:id', authenticate([ADMIN, REGULAR]), updatePet)
router.delete('/:id', authenticate([ADMIN, REGULAR]), deletePet)

export default router