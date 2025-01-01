import { type Response, type NextFunction } from "express";
import { CustomRequest } from "../../interfaces/iUser";
import { unFollowUserQuery } from "../../queries/follower";
import CustomError from "../../helpers/CustomError";
import { getPublicConnection, removeConnection } from "../../queries/connections";
import { deleteMR, getOneMR } from "../../queries/messagesRoom";

const unfollowUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const followerId = req.user?.id as string;
    const { followingId } = req.body;
    try {
        if (followerId === followingId) {
            throw new CustomError(400, "You can't unfollow yourself.")
        }
        await unFollowUserQuery(followerId, followingId).then(async ___ => {
            const publicRoom = await getPublicConnection(followingId)
            await removeConnection(followerId, publicRoom)

            const messageRoom = await getOneMR(followerId, followingId)
            if (messageRoom) console.log(await deleteMR(messageRoom))
        });

        res.status(200).json({ message: "Unfollowed successfully" })
    } catch (error) {
        next(error)
    }
}
export default unfollowUser;