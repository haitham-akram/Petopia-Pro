import { type Response, type NextFunction } from "express";
import { CustomRequest } from "../../interfaces/iUser";
import { getPetIdQuery } from "../../queries/pet";
import CustomError from "../../helpers/CustomError";

const getPetById = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const pet = await getPetIdQuery(id)
        if (!pet) {
            throw new CustomError(400, 'pet not found')
        }
        res.status(200).json({
            message: "Pet sound successfully",
            data: pet
        })
    } catch (error) {
        next(error)
    }
}
export default getPetById