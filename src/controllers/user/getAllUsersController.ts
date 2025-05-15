import { type Response, type NextFunction, type Request } from "express";
import { getAllUsersQuery } from "../../queries/User";


const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = Number(page) >= 0 ? Number(page) : 0
        const limitNumber = Number(limit) >= 1 ? Number(limit) : 10

        const Users = await getAllUsersQuery(pageNumber, limitNumber)
        res.status(200).json({
            message: 'user found successfully.',
            data: Users
        })
    } catch (error) {
        next(error)
    }
}
export default getAllUsersController