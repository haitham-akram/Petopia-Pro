import Flag from "../../database/schemas/flagSchema";
import Post from "../../database/schemas/postSchema";
import User from "../../database/schemas/userSchema";
/**
 * 
 * @param year 
 * @param month 
 * @param week 
 * @returns usersStatistics
 * how many users in the system.
 * how many active and inactive users.
 * how many verified and unverified users.
 * how many most following users.
 * top ten users based on total interactions (likes, comments, bookmarks).
 * how many flagged users.
 */
const getUsersStatisticsQuery = async (year: number, month?: number, week?: number) => {
    const match: any = {
        $expr: {
            $and: [
                { $eq: [{ $year: "$createdAt" }, year] }
            ]
        }
    }
    month ? match.$expr.$and.push({ $eq: [{ $month: "$createdAt" }, month] }) : null
    week ? match.$expr.$and.push({ $eq: [{ $week: "$createdAt" }, week] }) : null
    const users = await User.find(match);
    const topTenUsers = await Post.aggregate([
        { $match: match },
        {
            $group: {
                _id: "$userId",
                totalInteractions: { $sum: { $add: ["$likesCount", "$commentsCount", "$bookmarkCount"] } },// note check why totalInteractions is 6 and not 36 ?  
                likes: { $sum: "$likesCount" },
                comments: { $sum: "$commentsCount" },
                bookmarks: { $sum: "$bookmarkCount" }

            }
        },
        { $sort: { totalInteractions: -1 } },
        { $limit: 10 },
        {
            $lookup: {
                from: "users",
                localField: '_id',
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $project: {
                _id: 0,
                userId: "$user._id",
                fullName: "$user.fullName",
                totalInteractions: 1,
                likes: 1,
                comments: 1,
                bookmarks: 1
            }
        }
    ])
    const flaggedUsers = (await Flag.find(match)).filter((flag) => flag.userId).length

    return {
        total: users.length,
        active: users.filter((user) => user.status === 'active').length,
        inactive: users.filter((user) => user.status === 'inactive').length,
        verified: users.filter((user) => user.verified).length,
        unverified: users.filter((user) => !user.verified).length,
        admins: users.filter((user) => user.isAdmin).length,
        mostFollowings: users.filter((user) => user.followingCount === Math.max(...users.map((user) => user.followingCount))).map((user) => user.fullName),
        topTenUsers,
        flaggedUsers
    };
}
export default getUsersStatisticsQuery;