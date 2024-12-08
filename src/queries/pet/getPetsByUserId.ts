import Pet from "../../database/schemas/petSchema"

const getPetsByUserIdQuery = async (userId: string) => {
    const pets = await Pet.find({ ownerId: userId })
    return pets
}
export default getPetsByUserIdQuery