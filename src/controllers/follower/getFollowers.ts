import { type Response, type NextFunction } from "express";
import { getFollowerQuery } from "../../queries/follower"
import { type CustomRequest } from "../../interfaces/iUser";

const getFollowers = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const { status, search, page, limit } = req.query;
        const pageNum = Number(page) >= 0 ? Number(page) : 0
        const limitNum = Number(limit) > 0 ? Number(limit) : 10

        let followingStatus = status as "follower" | "following";
        if (!status) {
            followingStatus = "follower";
        }
        const followers = await getFollowerQuery(userId, followingStatus, search as string, pageNum, limitNum);

        res.status(200).json({ message: followingStatus + " found successfully", data: followers });
    } catch (error) {
        next(error)
    }
}
export default getFollowers;