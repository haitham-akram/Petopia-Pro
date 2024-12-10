import mongoose from "mongoose";
import Follower from "../../database/schemas/followerSchema";

const addFollowingQuery = async (userId: string, wantedUserId: string): Promise<boolean> => {

    let userFollower = await Follower.findOne({ userId });
    if (!userFollower) {
        userFollower = await Follower.create({
            userId,
            follows: []
        })
    }
    const alreadyFollowing = userFollower.follows
        .find((follow) => follow.userId.toString() === wantedUserId);
    if (!alreadyFollowing) {
        userFollower.follows
            .push({ userId: new mongoose.Types.ObjectId(wantedUserId), followState: 1 });
        await userFollower.save();
        return true
    }
    return false
}
export default addFollowingQuery