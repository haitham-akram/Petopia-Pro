import Follower from "../../database/schemas/followerSchema";
import User from "../../database/schemas/userSchema";
import CustomError from "../../helpers/CustomError";

const followUserQuery = async (followerId: string, followingId: string) => {
    const alreadyFollowing = await Follower.findOne({ followerId, followingId });
    if (alreadyFollowing) {
        throw new CustomError(400, "Already following this user");
    }
    (await Follower.create({ followerId, followingId })).save();
    await User.findOneAndUpdate({ _id: followerId }, { $inc: { followingCount: 1 } });
    await User.findOneAndUpdate({ _id: followingId }, { $inc: { followerCount: 1 } });
};

export default followUserQuery;
