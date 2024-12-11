import { type Request, type Response, type NextFunction } from "express";
import { deletePetTypeQuery } from "../../queries/petTypes";
const deletePetType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const deleted = await deletePetTypeQuery(id)
        res.status(200).json({
            message: "pet type deleted ",
            data: deleted
        })
    } catch (error) {
        next(error)
    }
}
export default deletePetType