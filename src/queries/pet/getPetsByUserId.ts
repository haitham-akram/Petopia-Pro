import Pet from "../../database/schemas/petSchema"

const getPetsByUserIdQuery = async (userId: string, search: string, page: number = 0, limit: number = 10) => {
    const pets = await Pet.find({ ownerId: userId })
        .where(
            search ? { 'petName': { $regex: `.*${search}.*`, $options: 'i' } } : {}
        )
        .skip(page * limit)
        .limit(limit)
    return pets
}
export default getPetsByUserIdQuery