import mongoose from "mongoose";
import Follower from "../../database/schemas/followerSchema";

const getFollowerQuery = async (userId: string, status: number, page: number = 1,
    pageSize: number = 10) => {
    const skip = (page - 1) * pageSize;
    const result = await Follower.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $unwind: "$follows" },
        { $match: { "follows.followState": status } },
        {
            $lookup: {
                from: "users",
                localField: "follows.userId", 
                foreignField: "_id", 
                as: "userDetails", 
            },
        },
        { $unwind: "$userDetails" },
        {
            $project: {
                _id: 0,
                followerId: "$follows.userId", // Return the userId of the follower
                followState: "$follows.followState", // Return the followState
                fullName: "$userDetails.fullName", // User's full name
                email: "$userDetails.email", // User's email
                userImage: "$userDetails.userImage", // User's image
                profileImage: "$userDetails.profileImage", // User's profile image
                address: "$userDetails.address", // User's address
                phone: "$userDetails.phone", // User's phone number
            },
        },
        // Pagination: Skip and limit the results
        { $skip: skip },
        { $limit: pageSize },
    ]);
    return result;
}

export default getFollowerQuery