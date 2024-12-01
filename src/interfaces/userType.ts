// import { InferSchemaType } from "mongoose";
// import User from "../database/schemas/userSchema";

interface UserType extends Document {
    fullName: string;
    email: string;
    password: string;
    userImage?: string;
    profileImage?: string;
    address?: string;
    phone?: string;
    isAdmin: boolean;
    status: 'active' | 'deactive';
    followerCount: number;
    followingCount: number;
    createdAt: NativeDate;
     updatedAt:NativeDate;
  }
  export type { UserType };
