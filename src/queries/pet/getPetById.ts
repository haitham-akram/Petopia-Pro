import Pet from "../../database/schemas/petSchema"

const getPetIdQuery = async (id: string) => {
    const pet = await Pet.findOne({ _id: id });
    return pet
}
export default getPetIdQuery