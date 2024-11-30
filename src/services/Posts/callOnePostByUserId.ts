import Post from "../../database/schemas/postSchema";


// call old one Post service by Post Id and User ID
const callOnePostByUserId = async ({ PostId, UserId }: { PostId: string, UserId: string }) => {
    let result;
    try {
        result = await Post.find({
            userId: UserId,
            _id: PostId
        });
    } catch (error) {
        result = error;
    }

    console.log('Post called:', result);
    return result;
};

export default callOnePostByUserId;