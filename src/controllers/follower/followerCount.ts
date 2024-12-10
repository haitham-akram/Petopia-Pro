import { type NextFunction, type Response } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { getFollowCounts } from "../../queries/follower";

const getFollowCount = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const counts = await getFollowCounts(userId);
        res.status(200).json({ message: "Follow counts found successfully", data: counts });
    } catch (error) {
        next(error)
    }
}
export default getFollowCount;