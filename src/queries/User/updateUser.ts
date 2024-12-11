import User from "../../database/schemas/userSchema";
import { UpdatedData } from "../../interfaces/iUser";


const updateUserQuery = async (id: string, updatedData: UpdatedData) => {
    const updated = await User.findOneAndUpdate({ _id: id }, { ...updatedData }, { new: true })
    return updated
}
export default updateUserQuery