import Pet from "../../database/schemas/petSchema"

const deletePetQuery = async (id: string, ownerId: string) => {
    const deletePet = await Pet.findOneAndDelete({ _id: id, ownerId })
    return deletePet
}
export default deletePetQuery