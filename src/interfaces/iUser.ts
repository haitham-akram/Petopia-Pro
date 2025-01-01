import { Request } from 'express'
interface UserType {
    fullName: string;
    email: string;
    password?: string;
    userImage?: string;
    profileImage?: string;
    address?: string;
    phone?: string;
    isAdmin: boolean;
    status: 'active' | 'inactive';
    verified: boolean,
    followerCount: number;
    followingCount: number;
    googleId?: string;
}
interface UpdatedData {
    fullName?: string,
    email?: string,
    password?: string;
    userImage?: string;
    profileImage?: string;
    address?: string;
    phone?: string;
    isAdmin?: boolean;
    status?: 'active' | 'inactive';
    verified?: boolean,
    followerCount?: number;
    followingCount?: number;

}
interface UserPayload {
    id: string,
    email: string,
    fullName?: string,
    isAdmin: boolean,
    hashedPassword?: string
}


interface CustomRequest extends Request {
    userInfo?: UserPayload
}


export type { UserType, UserPayload, CustomRequest, UpdatedData };
