import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { getPetsByUserIdQuery } from "../../queries/pet";

const getAllPetsByUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    try {
        const pets = await getPetsByUserIdQuery(userId)
        if (pets.length === 0) {
            res.status(200).json({
                message: "No pets found for this user.",
                data: []
            })
        }
        res.status(200).json({
            message: "Pets found successfully.",
            data: pets
        }
        )
    } catch (error) {
        next(error)
    }
}
export default getAllPetsByUser