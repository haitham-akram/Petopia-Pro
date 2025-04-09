import mongoose, { Schema } from "mongoose";
import Comment from "./commentSchema";

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: Number,
      default: 0,
      ref: "Category",
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
      type: String,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    sharesCounts: {
      type: Number,
      default: 0,
    },
    bookmarkCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, transform: (__doc, ret: any) => {
        ret.category = ret.category.title;
        delete ret.categoryId;
        delete ret._id;
        return ret;
      }
    },
    toObject: { virtuals: true }
  }
);

postSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: 'categoryId',
  justOne: true,
});


postSchema.virtual('pet', {
  ref: 'Pet',
  localField: 'petId',
  foreignField: '_id',
  justOne: true,
});

postSchema.virtual('product', {
  ref: 'Product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true,
});

postSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
});

postSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'relateId',
});


postSchema.post("findOneAndDelete", async function (doc, next) {
  try {
    await Comment.deleteMany({ postId: doc._id || doc.id });
    next();
  } catch (err) {
    next();
  }
});

postSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
