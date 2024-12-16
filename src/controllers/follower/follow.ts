import { type Response, type NextFunction } from "express";
import { followUserQuery } from "../../queries/follower";
import CustomError from "../../helpers/CustomError";
import { validateFollow } from "../../validation/follow";
import { type CustomRequest } from "../../interfaces/iUser";

const followUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { followerId, followingId } = await validateFollow({ ...req.body, followerId: req.user?.id });
        if (followerId === followingId) {
            throw new CustomError(400, "You can't follow yourself.")
        }
        await followUserQuery(followerId, followingId);
        res.status(200).json({ message: "Followed successfully." });

    } catch (error) {
        next(error)
    }
}
export default followUser;