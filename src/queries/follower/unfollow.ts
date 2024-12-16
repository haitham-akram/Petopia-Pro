import Follower from "../../database/schemas/followerSchema";
import User from "../../database/schemas/userSchema";

const unFollowUserQuery = async (followerId: string, followingId: string) => {
    const result = await Follower.deleteOne({ followerId, followingId });
    if (result.deletedCount === 0) {
        
        throw new Error("You are not following this user.");
    }
    await User.findOneAndUpdate({ _id: followerId }, { $inc: { followingCount: -1 } });
    await User.findOneAndUpdate({ _id: followingId }, { $inc: { followerCount: -1 } });
}
export default unFollowUserQuery;
