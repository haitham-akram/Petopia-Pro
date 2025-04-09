import { type Request, type Response, type NextFunction } from "express";
import { verifyOTP } from '../../helpers/otpHelpers';
import CustomError from "../../helpers/CustomError";
import { verifyUserQuery } from "../../queries/auth";
import { generateToken } from "../../helpers/authToken";
import { getOTP, deleteOTP } from "../../queries/otp";
import { createNewConnection } from "../../queries/connections";


const verifyUser = async (req: Request, res: Response, next: NextFunction) => {

    const { email, otp } = req.body;
    try {
        const userOtpData = await getOTP(email)
        if (!userOtpData) {
            throw new CustomError(400, 'this user is already verified.');
        }
        const isValid = verifyOTP(userOtpData.otp, otp, userOtpData.timestamp);

        if (isValid) {
            const verifiedUser = await verifyUserQuery(email, true)
            if (!verifiedUser) {
                throw new CustomError(404, 'User not found.');
            }
            await deleteOTP(email);
            const token = await generateToken({ id: verifiedUser.id, email: verifiedUser.email, isAdmin: verifiedUser.isAdmin });
            await createNewConnection(verifiedUser.id)

            res.cookie("token", token, {
                secure: process.env.NODE_ENV === "production",
                maxAge: 1 * 24 * 60 * 60 * 1000,
            }).json({
                message: 'Email verified successfully!',
                user: {
                    userName: 'user',
                    email,
                    userImage: verifiedUser.userImage || 'https://i.imgur.com/E0TQFoe.png',
                    profileImage: verifiedUser.profileImage || '',
                    bio: verifiedUser.bio || 'user bio',
                    followingCount: verifiedUser.followingCount,
                    followerCount: verifiedUser.followerCount,
                    phone: verifiedUser.phone || 'user phone',
                    isAdmin: verifiedUser.isAdmin
                }
            })

        } else {
            throw new CustomError(400, 'Invalid or expired OTP.');
        }
    } catch (error) {
        next(error)
    }

}
export default verifyUser