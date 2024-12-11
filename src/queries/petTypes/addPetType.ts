import PetType from "../../database/schemas/petTypeSchema";
import IPetType from "../../interfaces/iPetType";

const addPetTypeQuery = async (petType: IPetType) => {
    const newType = await PetType.create(petType)
    newType.save();
    return newType;
}
export default addPetTypeQuery;