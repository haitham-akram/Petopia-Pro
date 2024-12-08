import { IPet } from "../../interfaces/iPet"
import Pet from "../../database/schemas/petSchema"

const updatePetQuery = async (id: string, ownerId: string, petData: IPet) => {
    const updatedPet = await Pet.findOneAndUpdate({ _id: id, ownerId }, petData, { new: true })
    return updatedPet
}
export default updatePetQuery