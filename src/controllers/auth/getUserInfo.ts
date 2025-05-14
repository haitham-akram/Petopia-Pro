import { type Request, type Response, type NextFunction } from 'express';
import CustomError from '../../helpers/CustomError';

const getUserInfo = (req: Request, res: Response, next: NextFunction) => {
    const { token, googleUser } = req.user as { token: string, googleUser: any };

    if (!token || !googleUser) {
         next(new CustomError(401, 'Unauthorized'));
    }
    const googleUserInfo = {
        userName:  googleUser.fullName,
        fullName: googleUser.fullName,
        userEmail: googleUser.email,
        userProfileImage: googleUser.userImage,
        userBio: googleUser?.bio || "",
        userCoverImage: googleUser?.profileImage || "",
        userPhoneNumber: {
            countryNumber: "+970",
            phoneNumber: googleUser.phone
        },
        followingCount: googleUser.followingCount,
        followerCount: googleUser.followerCount,
    }
    // Return googleUser data
    res.status(200).json({ googleUser:googleUserInfo });
};

export default getUserInfo;