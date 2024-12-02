import CustomError from "../helpers/CustomError";
import { type Response, type NextFunction } from "express";
import { config } from "dotenv";
import { verifyToken } from "../helpers/authToken";
import { type CustomRequest } from '../interfaces/iUser'

config();

export enum userTypes {
    ADMIN = 1,
    REGULAR = 0,
}

const authenticate = (authorizedTypes: userTypes[]) => async (req: CustomRequest, _res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const authenticatedUser = await verifyToken(token);
            req.user = authenticatedUser;
            if (req.user === null) {
                next(new CustomError(402, 'User not found'));
            } else {
                const isAdmin = req.user?.isAdmin;
                if (isAdmin === undefined) {
                    next(new CustomError(402, 'User is missing admin status'));
                } else if (authorizedTypes.includes(isAdmin as unknown as userTypes)) {
                    next();
                } else {
                    next(new CustomError(403, 'Not enough permissions'));
                }
            }
        } catch (err) {
            next(err);
        }
    } else {
        next(new CustomError(401, "Unauthorized"));
    }
};
export default authenticate;
