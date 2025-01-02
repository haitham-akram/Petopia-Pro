import { NextFunction, Response } from "express";
import { CustomRequest } from "../../interfaces/iUser";
import { getPetStatisticsQuery } from "../../queries/Statistics";

const getPetStatistics = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { year, month, week } = req.query
        let yearNumber = parseInt(year as string, 10)
        const monthNumber = parseInt(month as string, 10)
        const weekNumber = parseInt(week as string, 10)
        Number.isNaN(yearNumber) ? yearNumber = (new Date()).getFullYear() : null
        const statistics = await getPetStatisticsQuery(yearNumber, monthNumber, weekNumber)
        res.status(200).json({
            message: "Pets statistics are found successfully.",
            data: statistics
        })
    } catch (error) {
        next(error)
    }
}
export default getPetStatistics