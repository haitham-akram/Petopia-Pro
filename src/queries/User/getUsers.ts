import User from "../../database/schemas/userSchema"

const getUsersQuery = async (search: string, page: number, limit: number) => {
    const users = User.find(search ? { 'fullName': { $regex: `.*${search}.*`, $options: 'i' } } : {})
        .skip(page * limit)
        .limit(limit)
    return users
}
export default getUsersQuery