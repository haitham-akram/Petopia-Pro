import { type Response, type NextFunction } from "express"
import { type CustomRequest } from "../../interfaces/iUser"
import { deleteFlagQuery } from "../../queries/flag"

const deleteFlag = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body
        const deletedFlag = await deleteFlagQuery(id)
        res.status(200).json({
            message: "Flag deleted successfully!",
            data: deletedFlag.deletedCount > 0
        })
    } catch (error) {
        next(error)
    }
}
export default deleteFlag