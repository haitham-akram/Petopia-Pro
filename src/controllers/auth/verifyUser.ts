import { type Request, type Response, type NextFunction } from "express";
import { verifyOTP } from '../../helpers/otpHelpers';
import CustomError from "../../helpers/CustomError";
import { verifyUserQuery } from "../../queries/auth";
import { generateToken } from "../../helpers/authToken";
import { getOTP, deleteOTP } from "../../queries/otp";


const verifyUser = async (req: Request, res: Response, next: NextFunction) => {

    const { email, otp } = req.body;
    try {
        const userOtpData = await getOTP(email)
        if (!userOtpData) {
            throw new CustomError(400, 'OTP not found for this email.');
        }
        const isValid = verifyOTP(userOtpData.otp, otp, userOtpData.timestamp);
        if (isValid) {
            const verifiedUser = await verifyUserQuery(email, true)
            if (!verifiedUser) {
                throw new CustomError(404, 'User not found');
            }
            await deleteOTP(email);
            const token = await generateToken({ id: verifiedUser.id, email: verifiedUser.email, isAdmin: verifiedUser.isAdmin });
            res.cookie('token', token, { httpOnly: true }).status(201).json({
                message: 'Email verified successfully!',
                data: verifiedUser
            })
        } else {
            throw new CustomError(400, 'Invalid or expired OTP.');
        }
    } catch (error) {
        next(error)
    }

}
export default verifyUser