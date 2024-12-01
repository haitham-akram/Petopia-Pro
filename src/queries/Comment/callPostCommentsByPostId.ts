import Comment from "../../database/schemas/commentSchema";


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

export default callPostCommentsByPostId