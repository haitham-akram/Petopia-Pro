import Pet from "../../database/schemas/petSchema"
import { IPet } from "../../interfaces/iPet"

const addNewPetQuery = async (petData: IPet) => {
    const pet = await Pet.create(petData);
    pet.save();
    return pet
}
export default addNewPetQuery