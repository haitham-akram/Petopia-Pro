import Follower from "../../database/schemas/followerSchema"

const checkMutaulity = async (userId: string, followerId: string) => {
    return await Follower.findOne({ followerId, followingId: userId }).select("");
}
export default checkMutaulity