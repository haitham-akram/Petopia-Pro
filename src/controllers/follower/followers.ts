import { type Response, type NextFunction } from "express";
import { getFollowerQuery } from "../../queries/follower"
import { type CustomRequest } from "../../interfaces/iUser";

const getFollowers = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const { status } = req.query;
        let followingStatus = Number(status);
        if (!status) {
            followingStatus = 1;
        }
        const followers = await getFollowerQuery(userId, followingStatus);
        res.status(200).json({ message: "follower found successfully", data: followers });
    } catch (error) {
        next(error)
    }
}
export default getFollowers;