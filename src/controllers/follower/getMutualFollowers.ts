import { type Response, type NextFunction } from "express";
import { getMutualFollowsQuery } from "../../queries/follower"
import { type CustomRequest } from "../../interfaces/iUser";

const getMutualFollowers = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const { page, limit } = req.query;
        const pageNum = Number(page) >= 0 ? Number(page) : 0
        const limitNum = Number(limit) > 0 ? Number(limit) : 10

        const mutualFollowers = await getMutualFollowsQuery(userId, pageNum, limitNum)
        res.status(200).json({ message: "Mutual Followers found successfully", data: mutualFollowers });
    } catch (error) {
        next(error)
    }
}
export default getMutualFollowers;