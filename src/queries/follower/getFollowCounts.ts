// here is business logic for follower operations
import mongoose from "mongoose";
import Follower from "../../database/schemas/followerSchema";
import { FollowCounts } from "../../interfaces/iFollowCounts";


export async function getFollowCounts(userId: string): Promise<FollowCounts> {
    const result = await Follower.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $unwind: "$follows" },
        {
            $group: {
                _id: "$follows.followState",
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                followState: "$_id",
                count: 1,
                _id: 0,
            },
        },
        { $sort: { followState: 1 } },
    ]);

    // Initialize counts for each followState
    const counts: FollowCounts = { notFollowing: 0, following: 0, mutual: 0 };

    // Map aggregation results to followState names
    result.forEach(({ followState, count }: { followState: number; count: number }) => {
        if (followState === 0) counts.notFollowing = count;
        if (followState === 1) counts.following = count;
        if (followState === 2) counts.mutual = count;
    });

    return counts;
}
