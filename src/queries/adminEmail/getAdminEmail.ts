import AdminEmail from "../../database/schemas/adminEmailSchema"

const getAdminEmailQuery = async (email: string) => {
    return await AdminEmail.findOne({ email: email })
}
export default getAdminEmailQuery