import mongoose, { Schema } from "mongoose";
import Post from "./postSchema";
import CustomError from "../../helpers/CustomError";

// Define the Comment schema
const commentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      require: true,
    },
    commentText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (__doc, ret: any) => {
        if (ret.createdAt) {
          const date = new Date(ret.createdAt);
          ret.createdAt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        }
        if (ret.updatedAt) {
          const date = new Date(ret.updatedAt);
          ret.updatedAt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        }
        delete ret.userId;
        delete ret._id;
        return ret;
      }
    },
    toObject: { virtuals: true }, // Include virtuals when calling .toObject()
  }
);

commentSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

commentSchema.virtual("user").get(function () {
  return this!.userId;
});

commentSchema.virtual("id").get(function () {
  return this._id.toHexString();
});


commentSchema.pre("save", async function (next) {
  try {
    const { postId } = this;

    let postExist = await Post.findById(postId);

    if (!postExist) {
      return next(new CustomError(404, "No post found with this Id."));
    }

    await Post.findByIdAndUpdate(postId, {
      $inc: { commentsCount: 1 },
    });
    next();
  } catch (err) {
    next(new CustomError(500, "Error from the server, try again later."));
  }
});


commentSchema.post("deleteOne", async function (doc, next) {
  try {
    await Post.findByIdAndUpdate(doc.postId, { $inc: { commentsCount: -1 } });
    next();
  } catch (err) {
    next();
  }
});

commentSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'relateId',
});


const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
