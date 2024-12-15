import { UserType } from "../interfaces/iUser"
import getAdminEmailQuery from "../queries/adminEmail/getAdminEmail";
import { signupQuery } from "../queries/auth"
import { validateSignup } from "../validation/auth"
import bcrypt from 'bcrypt';

const addUser = async (data: UserType) => {

    const {
        fullName,
        email,
        password,
        address,
        phone,
        userImage,
        profileImage,
        status,
        verified,
        followerCount,
        followingCount
    }: UserType = await validateSignup({
        ...(data), status: 'active'
    })
    const isAdminEmailFound = Boolean(await getAdminEmailQuery(email));

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await signupQuery({
        fullName,
        email,
        password: hashedPassword,
        address,
        phone,
        userImage,
        profileImage,
        isAdmin: isAdminEmailFound,
        status,
        verified,
        followerCount,
        followingCount
    })
    return newUser
}
export default addUser