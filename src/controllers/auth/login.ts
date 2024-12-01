import { type NextFunction, type Request, type Response } from 'express';
import { loginQuery } from "../../queries/auth";
import { loginSchema } from '../../validation/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const login = async (req: Request, res: Response, next: NextFunction) => {
    //userData:{email:string, password:string}
    try {
        const { email, password } = await loginSchema.validate(req.body)
        const user = await loginQuery({ email })
        if (user != null) {
            const { id, isAdmin, email, password: hashedPassword } = user
            const isPasswordTrue = await bcrypt.compare(password, hashedPassword)
        }
    } catch (error) {
        next(error)
    }



}
export default login;