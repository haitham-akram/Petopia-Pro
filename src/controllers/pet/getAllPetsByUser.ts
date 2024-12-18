import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { getPetsByUserIdQuery } from "../../queries/pet";

const getAllPetsByUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const { search, page, limit } = req.query
    const pageNum = Number(page) >= 0 ? Number(page) : 0
    const limitNum = Number(limit) >= 0 ? Number(limit) : 0
    try {
        const pets = await getPetsByUserIdQuery(userId, search as string, pageNum, limitNum)
        if (pets.length === 0) {
            res.status(200).json({
                message: "No pet found for this user.",
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