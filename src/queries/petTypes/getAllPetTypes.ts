import PetType from "../../database/schemas/petTypeSchema"

const getAllPetTypesQuery = async () => {
    const allTypes = await PetType.find()
    return allTypes
}
export default getAllPetTypesQuery