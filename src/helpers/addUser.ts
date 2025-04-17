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
        followingCount,
        googleId
    }: UserType = await validateSignup({
        ...(data), status: 'active'
    })
    const isAdminEmailFound = Boolean(await getAdminEmailQuery(email));
    let hashedPassword;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10)
    } else {
        hashedPassword = await bcrypt.hash('password', 10)
    }

    const newUser = await signupQuery({
        fullName,
        email,
        password: hashedPassword,
        googleId,
        address,
        phone,
        userImage,
        profileImage,
        isAdmin: isAdminEmailFound,
        status,
        verified: googleId ? true : verified,
        followerCount,
        followingCount
    })
    return newUser
}
export default addUser