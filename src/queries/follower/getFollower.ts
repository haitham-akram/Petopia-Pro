import mongoose from "mongoose";
import Follower from "../../database/schemas/followerSchema";

const getFollowerQuery = async (userId: string, status: 'follower' | 'following', search: string, page: number = 0, limit: number = 10) => {

    const skip = (page) * limit;

    const statusObj = {
        following: { followerId: new mongoose.Types.ObjectId(userId) },
        follower: { followingId: new mongoose.Types.ObjectId(userId) }
    }
    const followers = await Follower.aggregate([
        { $match: statusObj[status] },
        {
            $lookup: {
                from: 'users',
                localField: `${status}Id`,
                foreignField: '_id',
                as: 'user'
            }
        },
        { $unwind: "$user" },
        {
            $match: search ? { 'user.fullName': { $regex: `.*${search}.*`, $options: 'i' } } : {}
        },
        {
            $project: {
                user: { _id: 1, fullName: 1, email: 1, userImage: 1 },
                createdAt: 1,
                updatedAt: 1,
            }
        },
        { $skip: skip },
        { $limit: limit }
    ])
    return followers;


}
export default getFollowerQuery