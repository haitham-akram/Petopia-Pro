import User from "../../database/schemas/userSchema";

const loginQuery = async (userData:{ email: string }) => {
    const {email} =  userData;
    const user = await User.findOne({email:email});
    return user
}

export default loginQuery;