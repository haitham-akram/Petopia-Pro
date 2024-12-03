import { type Request } from 'express'
interface UserType {
    fullName: string;
    email: string;
    password: string;
    userImage?: string;
    profileImage?: string;
    address?: string;
    phone?: string;
    isAdmin: boolean;
    status: 'active' | 'inactive';
    followerCount: number;
    followingCount: number;
}
interface UserPayload {
    id: number,
    email: string,
    isAdmin: boolean
}


interface CustomRequest extends Request {
    user?: UserPayload
}


export type { UserType, UserPayload, CustomRequest };
