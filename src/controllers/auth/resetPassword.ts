import { type Request, type Response, type NextFunction } from "express";
import { verifyToken } from "../../helpers/authToken";
import { getUserByEmail, updateUserQuery } from "../../queries/User";
import CustomError from "../../helpers/CustomError";
import bcrypt from 'bcrypt';

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decoded = await verifyToken(token);

        if (!decoded || !decoded.hashedPassword) {
            throw new CustomError(400, 'Invalid or expired token')
        }
        const user = await getUserByEmail(decoded.email);
        if (!user) {
            throw new CustomError(404, 'User not found');
        } else if (user.password !== decoded.hashedPassword) {
            throw new Error('Token expired due to password update');
        }

        const newPassword = await bcrypt.hash(password, 10);
        await updateUserQuery(user.id, { password: newPassword });

        res.status(200).json({
            message: 'Password reset successful'
        })
    } catch (error) {
        next(error)
    }
}
export default resetPassword