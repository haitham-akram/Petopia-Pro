import { type Request, type Response, type NextFunction } from "express";
import { addPetTypeQuery } from "../../queries/petTypes";
import { validateNewPetType } from "../../validation/petType";

const addNewPetType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title } = await validateNewPetType(req.body)
        const newType = await addPetTypeQuery({ title })
        res.status(201).json({
            message: "pet type created successfully",
            data: newType
        })
    } catch (error) {
        next(error)
    }
}
export default addNewPetType