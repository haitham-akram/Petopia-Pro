import { type Request, type Response, type NextFunction } from "express";
import { validateNewPetType } from "../../validation/petType";
import { updatePetTypeQuery } from "../../queries/petTypes";

const updatePetType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const petType = await validateNewPetType(req.body)
        const updatedType = await updatePetTypeQuery(id, petType)
        res.status(200).json({
            message: "pet type updated successfully",
            data: updatedType
        })
    } catch (error) {
        next(error)
    }
}
export default updatePetType