import User from "../../database/schemas/userSchema"

const getAllUsersQuery = async (page: number, limit: number) => {
    const users = User.find()
        .populate("followings")
        .populate("followers")
        .skip(page * limit)
        .limit(limit)
    return users
}
export default getAllUsersQuery