import { type Response, type NextFunction } from "express";
import { checkMutaulity, followUserQuery } from "../../queries/follower";
import CustomError from "../../helpers/CustomError";
import { validateFollow } from "../../validation/follow";
import { type CustomRequest } from "../../interfaces/iUser";
import { newFollowerNotif } from "../../socket/notificationSends";
import { createNewMR } from "../../queries/messagesRoom";

const followUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;

        const { followerId, followingId } = await validateFollow({ ...req.body, followerId: userId });
        if (followerId === followingId) {
            throw new CustomError(400, "You can't follow yourself.")
        }

        const actorName = req.user?.fullName

        await followUserQuery(followerId, followingId)
            .then(async __ => {
                const areMutual = await checkMutaulity(followerId, followingId);
                console.log(areMutual)
                if (areMutual) console.log(await createNewMR(followerId, followingId))
                newFollowerNotif(actorName as string, userId as string)
            });

        res.status(200).json({ message: "Followed successfully." });

    } catch (error) {
        next(error)
    }
}
export default followUser;