import Post from "../../database/schemas/postSchema";



// call old Posts service by User ID
const callAllPostsByUserId = async ({ UserId }: { UserId: string }) => {
    let result;
    try {
        result = await Post.find({
            userId: UserId
        });
    } catch (error) {
        result = error;
    }

    console.log('Post called:', result);
    return result;
};

export default callAllPostsByUserId