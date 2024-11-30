import mongoose, { InferSchemaType, ObjectId } from "mongoose";
import PostImage from "../database/schemas/postImageSchema";
import Post from "../database/schemas/postSchema";
type PostDataType = InferSchemaType<typeof Post>;
type PostImageDataType = InferSchemaType<typeof PostImage>;

// Post Model CRUD function depend on MongoDB connection and Mongoose schema

// Add new Post service
const addNewPost = async ({ PostData, PostImageData }: { PostData: PostDataType, PostImageData?: PostImageDataType }) => {


    // Save the Post to the database
    const newPost = new Post(PostData
        // ||
        // {
        //     userId: '64f1a7c9a15a3f7b4c3e4f8e', // Example user ID
        //     categoryId: 2, // Assume category 2 is "Science"
        //     postContent: 'I want to know the type of this Dog?',
        //     isHaveImg: true, // The post has an image
        //     likesCount: 10,
        //     commentsCount: 3,
        // }
    );
    await newPost.save();

    const newImage = new PostImage(PostImageData
        //  ||{
        // imageId: 101, // Example unique image ID
        // postId: mongoose.id, // ID of the associated post
        // imageUrl: 'https://example.com/images/sample-image.jpg',
        // }
    );

    // Save the image of the post if the post have one to the database
    await newImage.save();
    console.log('Post saved:', newPost);
};


// call old Post service by ID
const callPostById = async ({ PostId }: { PostId: string }) => {
    let result;
    try {
        result = await Post.findById(PostId);
    } catch (error) {
        result = error;
    }

    console.log('Post called:', result);
    return result;
};



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



export { addNewPost, callPostById, callAllPostsByUserId, callOnePostByUserId };