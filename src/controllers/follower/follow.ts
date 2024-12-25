import { type Response, type NextFunction } from "express";
import { followUserQuery } from "../../queries/follower";
import CustomError from "../../helpers/CustomError";
import { validateFollow } from "../../validation/follow";
import { type CustomRequest } from "../../interfaces/iUser";
import { newFollowerNotif } from "../../socket/notificationSends";

const followUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;

        const { followerId, followingId } = await validateFollow({ ...req.body, followerId: userId });
        if (followerId === followingId) {
            throw new CustomError(400, "You can't follow yourself.")
        }

        const actorName = req.user?.fullName

        await followUserQuery(followerId, followingId)
            .then(__ => newFollowerNotif(actorName as string, userId as string));
            console.log(actorName)

        res.status(200).json({ message: "Followed successfully." });

    } catch (error) {
        next(error)
    }
}
export default followUser;