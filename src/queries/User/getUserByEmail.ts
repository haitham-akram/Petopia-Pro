import User from "../../database/schemas/userSchema"


const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email })
    return user
}
export default getUserByEmail