import { type NextFunction, type Request, type Response } from "express";
import { UserType } from "../../interfaces/iUser";
import { generateToken } from "../../helpers/authToken";
import addUser from "../../helpers/addUser";

const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await addUser(req.body as UserType)
        const token = await generateToken({ id: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin });
        res.cookie('token', token, { httpOnly: true }).status(201).json({
            message: 'User Created Successfully',
            data: newUser
        })
    } catch (error) {
        next(error)
    }
}
export default signup