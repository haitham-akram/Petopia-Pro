import mongoose, { Schema } from "mongoose";
import Comment from "./commentSchema";

// Define the Post schema
const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: Number, // The ID of the category the post belongs to
      default: 0,
      required: true,
      enum: [0, 1, 2, 3],
    },
    petId: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    postContent: {
      type: String, // Content of the post
      required: true,
    },
    likesCount: {
      type: Number, // Number of likes on the post
      default: 0, // Default value is 0
    },
    commentsCount: {
      type: Number, // Number of comments on the post
      default: 0, // Default value is 0
    },
    images: [
      {
        url: {
          type: String, // Image Url
          required: true,
        },
      },
    ],
    bookmarkCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

postSchema.post("save", async function (__doc, next) {
  try {
    // console.log(doc);
    // const { userId, _id: postId } = doc;

    // const allFollwers = await getFollowerQuery(
    //   userId.toString(),
    //   "follower",
    //   ""
    // );

    // const followersNotify = allFollwers.map(({ _id }) => {
    //   return {
    //     userId: _id.toString(),
    //     actorId: userId.toString(),
    //     type: 0,
    //     data: { postId },
    //   };
    // });

    // console.log(sendNotify("post created", userId.toString()));

    // await Notification.insertMany(followersNotify);

    // console.log(followersNotify);

    next();
  } catch (err) {
    next();
  }
});

postSchema.post("findOneAndDelete", async function (doc, next) {
  try {
    await Comment.deleteMany({ postId: doc._id });
    next();
  } catch (err) {
    next();
  }
});
// Create the Post model from the schema
const Post = mongoose.model("Post", postSchema);

export default Post;
