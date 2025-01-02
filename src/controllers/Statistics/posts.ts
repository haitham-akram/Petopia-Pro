import { NextFunction, Response } from "express";
import { CustomRequest } from "../../interfaces/iUser";
import { getPostStatisticsQuery } from "../../queries/Statistics";

const getPostStatistics = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { year, month, week } = req.query
        let yearNumber = parseInt(year as string, 10)
        const monthNumber = parseInt(month as string, 10)
        const weekNumber = parseInt(week as string, 10)
        Number.isNaN(yearNumber) ? yearNumber = (new Date()).getFullYear() : null
        const statistics = await getPostStatisticsQuery(yearNumber, monthNumber, weekNumber)
        res.status(200).json({
            message: "Posts statistics found successfully.",
            data: statistics
        })
    } catch (error) {
        next(error)
    }
}
export default getPostStatistics