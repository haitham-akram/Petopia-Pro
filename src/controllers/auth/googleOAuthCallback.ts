import { type NextFunction, type Request, type Response } from 'express';
import CustomError from '../../helpers/CustomError';
const googleCallback = async (req: Request, res: Response, next: NextFunction) => {
    const { connectios, token } = req.user as { connectios: string[], token: string };

    !token ? next(new CustomError(404, 'Token not found')) : {}

    res.cookie('token', token, { httpOnly: true }).json({ message: 'Logged in successfully', connectios })
}
export default googleCallback