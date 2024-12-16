import { type Response, type NextFunction } from "express";
import { getFollowerQuery } from "../../queries/follower"
import { type CustomRequest } from "../../interfaces/iUser";

const getFollowers = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const { status, page, limit } = req.query;
        const pageNum = Number(page) >= 0 ? Number(page) : 0
        const limitNum = Number(limit) > 0 ? Number(limit) : 10

        let followingStatus = status as "follower" | "following";
        if (!status) {
            followingStatus = "follower";
        }
        const followers = await getFollowerQuery(userId, followingStatus, pageNum, limitNum);
        const transformedFollowers = followers.map(follower => ({
            _id: follower._id,
            user: follower[followingStatus === "follower" ? "followerId" : "followingId"],
            createdAt: follower.createdAt,
            updatedAt: follower.updatedAt,
        }));

        res.status(200).json({ message: followingStatus + " found successfully", data: transformedFollowers });
    } catch (error) {
        next(error)
    }
}
export default getFollowers;