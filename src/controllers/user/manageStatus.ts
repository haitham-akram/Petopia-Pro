import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { manageStatusQuery } from "../../queries/User";
import CustomError from "../../helpers/CustomError";

interface UserReq {
    userId: string;
    status: 'active' | 'inactive';
}
const manageStatus = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const loggedUserId = req.userInfo?.id
        const { userId, status } = req.body as UserReq;
        if (loggedUserId === userId) throw new CustomError(400, "you can't update your active status !")
        const updatedUserStatus = await manageStatusQuery(userId, status)
        res.status(200).json({
            message: 'user status updated successfully.',
            data: updatedUserStatus
        })
    } catch (error) {
        next(error)
    }
}
export default manageStatus