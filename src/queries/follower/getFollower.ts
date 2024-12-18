import Follower from "../../database/schemas/followerSchema";

const getFollowerQuery = async (userId: string, status: 'follower' | 'following', search: string, page: number = 1, limit: number = 10) => {

    const skip = (page) * limit;

    const statusObj = {
        following: { followerId: userId },
        follower: { followingId: userId }
    }

    const followers = await Follower
        .find(statusObj[status])
        .populate({
            path: status + "Id",
            match: search ? { 'fullName': { $regex: `.*${search}.*`, $options: 'i' } } : {},
            select: 'fullName email userImage'
        })
        .skip(skip)
        .limit(limit)
        .exec();

    // Filter out documents where the populated field is null
    const filteredFollowers = followers.filter(follower => follower[`${status}Id`] !== null);

    return filteredFollowers;

}
export default getFollowerQuery