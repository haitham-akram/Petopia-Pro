import { type NextFunction, type Request, type Response } from 'express';
import CustomError from '../../helpers/CustomError';
import { config } from 'dotenv';

const googleCallback = async (req: Request, res: Response, next: NextFunction) => {
    const { connectios, token } = req.user as { connectios: string[], token: string };
    config();
    if (!token) {
        return next(new CustomError(404, 'Token not found'));
    }

    // Redirect to the frontend callback page with the token as a query parameter
    const frontendRedirectUrl = `${process.env.FRONTEND_URL}/google-callback?token=${token}`;
    res.redirect(frontendRedirectUrl);
};

export default googleCallback;