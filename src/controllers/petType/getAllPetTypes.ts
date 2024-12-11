import { type Request, type Response, type NextFunction } from "express";
import { getAllPetTypesQuery } from "../../queries/petTypes";

const getAllPetTypes = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const types = await getAllPetTypesQuery()
        res.status(200).json({
            message: "Pet Types found successfully.",
            data: types
        })
    } catch (error) {
        next(error)
    }
}
export default getAllPetTypes