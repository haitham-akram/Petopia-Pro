import Pet from "../../database/schemas/petSchema"

const getPetsByUserIdQuery = async (userId: string, page: number = 0, limit: number = 10) => {
    const pets = await Pet.find({ ownerId: userId }).skip(page * limit).limit(limit)
    return pets
}
export default getPetsByUserIdQuery