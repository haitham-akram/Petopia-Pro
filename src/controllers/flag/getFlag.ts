import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { getFlagsQuery } from "../../queries/flag";

const getFlags = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = Number(page) >= 0 ? Number(page) : 0
        const limitNumber = Number(limit) >= 1 ? Number(limit) : 10

        const flags = await getFlagsQuery(pageNumber, limitNumber)
        res.status(200).json({
            message: 'flags found successfully.',
            data: flags
        })
    } catch (error) {
        next(error)
    }
}
export default getFlags