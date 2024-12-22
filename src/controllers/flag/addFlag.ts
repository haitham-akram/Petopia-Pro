import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { addFlagQuery } from "../../queries/flag";
import validateNewFlag from "../../validation/flag/flagValidation";
import CustomError from "../../helpers/CustomError";

const addFlag = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const ownerId = req.user?.id as string
        const flag = await validateNewFlag({ ...req.body, ownerId })
        if (ownerId === flag.userId) throw new CustomError(400, "you can't flag yourself dummy.")
        const newFlag = await addFlagQuery(flag)
        res.status(201).json({
            message: "flag created successfully.",
            data: newFlag
        })
    } catch (error) {
        next(error)
    }


}
export default addFlag