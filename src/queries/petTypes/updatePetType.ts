import PetType from "../../database/schemas/petTypeSchema";
import IPetType from "../../interfaces/iPetType";

const updatePetTypeQuery = async (id: string, typePet: IPetType) => {
    const updated = await PetType.findOneAndUpdate(
        { _id: id },
        typePet,
        { new: true }
    )
    return updated;
}
export default updatePetTypeQuery