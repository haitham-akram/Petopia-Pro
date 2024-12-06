import User from "../../database/schemas/userSchema"

const verifyUserQuery = async (email: string, verified: boolean) => {
    const updatedUser = await User.findOneAndUpdate({ email }, { verified: verified }, { new: true })
    return updatedUser
}
export default verifyUserQuery