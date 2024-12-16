import Follower from "../../database/schemas/followerSchema";

const getFollowerQuery = async (userId: string, status: 'follower' | 'following', page: number = 1, limit: number = 10) => {
    const skip = page * limit;
    const followers = await Follower
        .find(status === 'follower' ? { followingId: userId } : { followerId: userId })
        .populate(status === 'follower' ? 'followerId' : 'followingId', 'fullName email userImage')
        .skip(skip)
        .limit(limit)
    return followers
}
export default getFollowerQuery