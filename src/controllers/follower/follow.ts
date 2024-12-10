import { type Response, type NextFunction } from "express";
import { addFollowingQuery } from "../../queries/follower";
import CustomError from "../../helpers/CustomError";
import { validateFollow } from "../../validation/follow";
import { type CustomRequest } from "../../interfaces/iUser";

const followUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { userId, wantedUserId } = await validateFollow({ ...req.body, userId: req.user?.id });
        const following = await addFollowingQuery(userId, wantedUserId);
        if (!following) {
            throw new CustomError(400, "Already following");
        } else {
            res.status(200).json({ message: "Followed successfully" });
        }
    } catch (error) {
        next(error)
    }
}
export default followUser;