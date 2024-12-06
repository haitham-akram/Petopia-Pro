import User from "../../database/schemas/userSchema";
import { UpdatedData } from "../../interfaces/iUser";


const updateUserQuery = async (id: string, updatedData: UpdatedData) => {
    const updated = await User.updateOne({ id }, { updatedData })
    return updated
}
export default updateUserQuery