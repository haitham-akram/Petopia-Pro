import { NextFunction, Response } from "express";
import { CustomRequest } from "../../interfaces/iUser";
import { getProductStatisticsQuery } from "../../queries/Statistics";

const getProductStatistics = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { year, month, week } = req.query
        let yearNumber = parseInt(year as string, 10)
        const monthNumber = parseInt(month as string, 10)
        const weekNumber = parseInt(week as string, 10)
        Number.isNaN(yearNumber) ? yearNumber = (new Date()).getFullYear() : null
        const statistics = await getProductStatisticsQuery(yearNumber, monthNumber, weekNumber)
        res.status(200).json({
            message: "Products statistics are found successfully.",
            data: statistics
        })
    } catch (error) {
        next(error)
    }
}
export default getProductStatistics