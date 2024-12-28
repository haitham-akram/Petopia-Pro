import { type Request, type Response, type NextFunction } from "express";
import { getUserByEmail } from "../../queries/User";
import CustomError from "../../helpers/CustomError";
import { generateToken } from "../../helpers/authToken";
import { config } from "dotenv";
import { sendEmail } from "../../helpers/emailHelper";

config();
const { DOMAIN_URL } = process.env;
const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            throw new CustomError(404, 'User not found.');
        }
        const resetToken = await generateToken({ id: user.id, email: user.email, isAdmin: user.isAdmin, hashedPassword: user.password as string });
        const resetUrl = `${DOMAIN_URL}/api/v1/auth/reset-password/${resetToken}`;
        const htmlEmail = `
        <p>You requested a password reset</p>
        <p>Click this <a href="${resetUrl}">link</a> to reset your password</p>
        <p>If you didn't request this, please ignore this email.</p>
    `
        await sendEmail(email, "Password Reset", htmlEmail, true)
        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        next(error)
    }
}
export default forgetPassword