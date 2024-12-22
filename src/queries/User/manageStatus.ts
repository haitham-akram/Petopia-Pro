import User from "../../database/schemas/userSchema"

const manageStatusQuery = async (userId: string, status: 'active' | 'inactive') => {
    const userStatus = await User.findByIdAndUpdate({ _id: userId }, { status }, { new: true })
        .select('_id fullName status')
    return userStatus

}
export default manageStatusQuery