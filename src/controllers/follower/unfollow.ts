import { type Response, type NextFunction } from "express";
import { CustomRequest } from "../../interfaces/iUser";
import { unFollowUserQuery } from "../../queries/follower";
import CustomError from "../../helpers/CustomError";

const unfollowUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const followerId = req.userInfo?.id as string;
    const { followingId } = req.body ;
    try {
        if (followerId === followingId) {
            throw new CustomError(400, "You can't unfollow yourself.")
        }
        await unFollowUserQuery(followerId, followingId);
        res.status(200).json({ message: "Unfollowed successfully" });
    } catch (error) {
        next(error)
    }
}
export default unfollowUser;