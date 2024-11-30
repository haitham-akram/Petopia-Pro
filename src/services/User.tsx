import mongoose, { InferSchemaType, ObjectId } from "mongoose";
import User from "../database/schemas/userSchema";
// type CommentDataType = InferSchemaType<typeof Comment>;

// User Model CRUD function depend on MongoDB connection and Mongoose schema

// call old User account service by ID
const callPostCommentsByPostId = async ({ UserId }: { UserId: string }) => {
    let result;
    try {
        result = await User.findById(UserId);
    } catch (error) {
        result = error;
    }
    console.log('User called:', result);
    return result;
};

export { callPostCommentsByPostId }