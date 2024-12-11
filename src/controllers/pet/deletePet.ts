import { type Response, type NextFunction } from "express"
import { type CustomRequest } from "../../interfaces/iUser";
import { deletePetQuery } from "../../queries/pet";

const deletePet = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const ownerId = req.user?.id as string;
    const id = req.params.id
    try {
        const deletedPet = await deletePetQuery(id, ownerId)
        res.status(200).json({
            message: "Pet deleted successfully",
            data: deletedPet
        })
    } catch (error) {
        next(error)
    }

}
export default deletePet