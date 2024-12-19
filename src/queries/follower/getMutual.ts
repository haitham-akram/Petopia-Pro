import mongoose from "mongoose";
import Follower from "../../database/schemas/followerSchema"

const getMutualFollowsQuery = async (userId: string, search: string, page: number = 0, limit: number = 10) => {


    const mutualUsers = await Follower.aggregate([
        {
            $match: {
                followerId: new mongoose.Types.ObjectId(userId), // Match the logged-in user
            },
        },
        {
            $lookup: {
                from: "followers",
                localField: "followingId", // Match the user's followings
                foreignField: "followerId", // Against the user's followers
                as: "mutual",
            },
        },
        { $unwind: "$mutual" }, // Convert array result from $lookup to a single object
        {
            $lookup: {
                from: "users",
                localField: "mutual.followerId",
                foreignField: "_id",
                as: "user",
            },
        },
        { $unwind: "$user" },
        {
            $match: search ? { 'user.fullName': { $regex: `.*${search}.*`, $options: 'i' } } : {}
        },
        {
            $project: {
                user: { _id: 1, fullName: 1, email: 1, userImage: 1 },
                createdAt: "$mutual.createdAt",
                updatedAt: "$mutual.updatedAt",
            },
        },
    ])
        .skip(page * limit)
        .limit(limit)


    return mutualUsers
}
export default getMutualFollowsQuery