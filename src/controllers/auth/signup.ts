import { type NextFunction, type Request, type Response } from "express";
import { UserType } from "../../interfaces/iUser";
import addUser from "../../helpers/addUser";
import { generateOTP } from '../../helpers/otpHelpers';
import { sendEmail } from '../../helpers/emailHelper';
import { storeOTP } from "../../queries/otp";

const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await addUser(req.body as UserType)
        const otp = generateOTP();
        const email = newUser.email
        storeOTP({ email, otp, timestamp: Date.now() })
        
        await sendEmail(email, 'Your OTP Code', `Your OTP is: ${otp}`);

        res.status(201).json({
            message: 'OTP sent to your email.',
            data: newUser
        })
    } catch (error) {
        next(error)
    }
}
export default signup