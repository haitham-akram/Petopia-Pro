import { type Request, type Response, type NextFunction } from "express";
import { generateOTP } from "../../helpers/otpHelpers";
import { getOTP, updateOTP } from "../../queries/otp";
import CustomError from "../../helpers/CustomError";
import { sendEmail } from "../../helpers/emailHelper";

const newOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const oldOtp = await getOTP(email);
        if (!oldOtp) {
            throw new CustomError(404, 'this user is already verified');
        } else if (!(Date.now() - oldOtp.timestamp < 30000)) {
            const otp = await updateOTP(email, { otp: generateOTP(), timestamp: Date.now() })
            await sendEmail(email, 'Your OTP Code', `Your new OTP is: ${otp}`);
            res.status(200).json({
                message: 'OTP sent to your email.'
            })
        }
    } catch (error) {
        next(error)
    }

}
export default newOtp