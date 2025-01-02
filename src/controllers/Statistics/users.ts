import { NextFunction, Response } from "express";
import { CustomRequest } from "../../interfaces/iUser";
import { getUsersStatisticsQuery } from "../../queries/Statistics";

const getUsersStatistics = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        const { year, month, week } = req.query;
        let yearNumber = parseInt(year as string, 10);
        const monthNumber = month ? parseInt(month as string, 10) : undefined;
        const weekNumber = week ? parseInt(week as string, 10) : undefined;
        Number.isNaN(yearNumber) ? yearNumber = (new Date()).getFullYear() : null
        const statistics = await getUsersStatisticsQuery(yearNumber, monthNumber, weekNumber);
        res.status(200).json({
            message: "Users statistics found successfully.",
            data: statistics
        });
    } catch (error) {
        next(error);
    }
}
export default getUsersStatistics;