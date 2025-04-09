import mongoose, { Schema } from "mongoose";
import Post from "./postSchema";
import Comment from "./commentSchema";
import CustomError from "../../helpers/CustomError";

// Define the Like schema
const likeSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    relateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    isComment: {
      type: Boolean,
      default: false,
      require: true,
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt,
    toJSON: {
      virtuals: true,       // Include virtuals in JSON responses
      transform: (__doc, ret) => {
        delete ret.userId;
        delete ret._id;
        delete ret._v;
        return ret;
      }
    },
    toObject: { virtuals: true }, // Include virtuals when calling .toObject()
  }
);


likeSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

likeSchema.virtual("user").get(function () {
  return this!.userId;
});

likeSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

likeSchema.pre("save", async function (next) {
  try {
    const { userId, collection, relateId, isComment } = this;
    const alreadyLikes = await collection.findOne({ userId, relateId });

    if (alreadyLikes) {
      await collection.deleteOne({ userId, relateId });
      if (!isComment) {
        await Post.findByIdAndUpdate(relateId, {
          $inc: { likesCount: -1 },
        });
        return next(new CustomError(200, "the like are deleted"));
      }
    }

    let relateCollection: typeof Post | typeof Comment = Comment;

    // Check the type of relateId (Post or Comment)
    if (!isComment) {
      await Post.findByIdAndUpdate(relateId, {
        $inc: { likesCount: 1 },
      });
      next();
    }

    let commentExist = await relateCollection.findById(relateId);

    if (!commentExist) {
      return next(new CustomError(404, "No comment found with this Id."));
    }
    next();
  } catch (err) {
    next(new CustomError(500, "Error from the server, try again later."));
  }
});

// Create the Like model from the schema
const Like = mongoose.model("Like", likeSchema);

export default Like;
