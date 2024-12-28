import CustomError from "../helpers/CustomError";
import { type Response, type NextFunction } from "express";
import { config } from "dotenv";
import { verifyToken } from "../helpers/authToken";
import { type CustomRequest, type UserPayload } from '../interfaces/iUser'

config();

export enum userTypes {
    ADMIN = 1,
    REGULAR = 0,
}

const authenticate = (authorizedTypes: userTypes[]) => async (req: CustomRequest, _res: Response, next: NextFunction): Promise<void> => {
    const { token } = req.cookies;
    if (token) {
        try {
            const authenticatedUser = await verifyToken(token) as UserPayload;
            req.user = authenticatedUser;

            if (authenticatedUser === null) {
                next(new CustomError(404, 'User Not Found'));
            } else {
                const isAdmin = req.user?.isAdmin;
                if (isAdmin === undefined) {
                    next(new CustomError(400, 'User is missing admin status'));
                } else if (authorizedTypes.includes(Number(isAdmin) as Number as userTypes)) {
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
