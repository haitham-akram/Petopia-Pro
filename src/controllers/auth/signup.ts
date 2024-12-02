import { type NextFunction, type Request, type Response } from "express";
import bcrypt from 'bcrypt';
import { UserType } from "../../interfaces/iUser";
import { validateSignup } from "../../validation/auth";
import { signupQuery } from "../../queries/auth";
import { generateToken } from "../../helpers/authToken";

const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            fullName,
            email,
            password,
            address,
            phone,
            userImage,
            profileImage,
            isAdmin,
            status,
            followerCount = 0,
            followingCount = 0
        }: UserType = await validateSignup(req.body)
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await signupQuery({
            fullName,
            email,
            password: hashedPassword,
            address,
            phone,
            userImage,
            profileImage,
            isAdmin,
            status,
            followerCount,
            followingCount
        })
        const token = await generateToken({ id: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin });
        res.cookie('token', token, { httpOnly: true }).status(201).json({
            message: 'User Created Successfully',
            data: {
                fullName,
                email,
                phone,
                userImage,
                profileImage,
                address,
                isAdmin,
                status,
                followerCount,
                followingCount
            }
        })
    } catch (error) {
        next(error)
    }
}
export default signup