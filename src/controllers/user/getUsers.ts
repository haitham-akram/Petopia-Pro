import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { getUsersQuery } from "../../queries/User";


const getUsers = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { search, page, limit } = req.query;
        const pageNumber = Number(page) >= 0 ? Number(page) : 0
        const limitNumber = Number(limit) >= 1 ? Number(limit) : 10

        const Users = await getUsersQuery(search as string, pageNumber, limitNumber)
        res.status(200).json({
            message: 'user found successfully.',
            data: Users
        })
    } catch (error) {
        next(error)
    }
}
export default getUsers