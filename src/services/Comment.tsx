import mongoose, { InferSchemaType, ObjectId } from "mongoose";
import Comment from "../database/schemas/commentSchema";
type CommentDataType = InferSchemaType<typeof Comment>;

// Comment Model CRUD function depend on MongoDB connection and Mongoose schema

// Add new Post service
const addNewComment = async (
    { CommentData }:
        { CommentData: CommentDataType }
) => {

    // Save the Comment to the database
    const newComment = new Comment(CommentData);
    await newComment.save();
    console.log('Comment saved:', newComment);
};


// call old Comments service by Post ID
const callPostCommentsByPostId = async ({ PostId }: { PostId: string }) => {
    let result;
    try {
        result = await Comment.find({
            postId: PostId,
        });
    } catch (error) {
        result = error;
    }

    console.log('Comment called:', result);
    return result;
};



// call old Comments service by User ID
const callAllPostCommentsByUserId = async ({ Userid }: { Userid: string }) => {
    let result;
    try {
        result = await Comment.find({ userId: Userid });
    } catch (error) {
        result = error;
    }

    console.log('Comment called:', result);
    return result;
};



export {
    addNewComment,
    callPostCommentsByPostId,
    callAllPostCommentsByUserId,
}