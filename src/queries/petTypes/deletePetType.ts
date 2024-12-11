import PetType from "../../database/schemas/petTypeSchema"


const deletePetTypeQuery = async (id: string) => {
    const deleted = await PetType.findOneAndDelete({ _id: id })
    return deleted
}
export default deletePetTypeQuery