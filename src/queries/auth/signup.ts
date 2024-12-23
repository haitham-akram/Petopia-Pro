import User from "../../database/schemas/userSchema";
import { UserType } from "../../interfaces/iUser";
import CustomError from "../../helpers/CustomError";

const signupQuery = async (userData: UserType) => {
    const isUserFound = await User.findOne({ email: userData.email });
    if (isUserFound) {
        throw new CustomError(400, "User already exists");
    }
    const { fullName, email, password, userImage, profileImage, address, phone, status, followerCount, followingCount, isAdmin } = userData;
    const user = await new User(
        { fullName, email, password, userImage, profileImage, address, phone, status, followerCount, followingCount, isAdmin }
    ).save();

    return user;
}
export default signupQuery;