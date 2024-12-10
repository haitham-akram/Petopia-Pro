import Follower from "../../database/schemas/followerSchema";

const unFollowUser = async (userId: string, unFollowUserId: string) => {
    const follower = await Follower.findOne({ userId, "follows.userId": unFollowUserId });
    if (!follower || follower.follows.some((follow) => follow.userId.toString() !== unFollowUserId && follow.followState !== 1)) {
        return false;
    }
    const result = await Follower.updateOne()
}
export default unFollowUser;