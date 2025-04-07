import { type NextFunction, type Request, type Response } from "express";
import { loginQuery } from "../../queries/auth";
import { validateLogin } from "../../validation/auth";
import bcrypt from "bcrypt";
import CustomError from "../../helpers/CustomError";
import { generateToken } from "../../helpers/authToken";
import { connectUserRooms } from "../../queries/connections";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = await validateLogin(req.body)
    const user = await loginQuery({ email })
    if (user != null) {
      const { id, isAdmin, email, password: hashedPassword, status, verified } = user
      if (status === 'inactive') {
        throw new CustomError(400, 'Account is Inactive')
      }
      if (!verified) {
        throw new CustomError(400, 'verify your account first!')
      }
      const isPasswordTrue = await bcrypt.compare(password, hashedPassword as string)
      if (isPasswordTrue) {
        const payload = {
          id, isAdmin, email
        }
        const token = await generateToken(payload)
        const connectios = await connectUserRooms(id as string)

        res
          .cookie("token", token, {
            secure: process.env.NODE_ENV === "production",
            maxAge: 1 * 24 * 60 * 60 * 1000,
          })
          .json({ message: "Logged in successfully", connectios });

      } else {
        throw new CustomError(400, "Wrong Password");
      }
    } else {
      throw new CustomError(400, "Please Create an Account First");
    }
  } catch (error) {
    next(error);
  }
};
export default login;
