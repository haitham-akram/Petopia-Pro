import mongoose, { Schema } from "mongoose";
import { addNewConnection, getPublicConnection } from "../../queries/connections";
import CustomError from "../../helpers/CustomError";

// Define the Follower schema
const followerSchema = new Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (__doc, ret: any) => {
        ret.id = ret?._id;
        // Format createdAt and updatedAt to "yyyy-m-d"
        if (ret.createdAt) {
          const date = new Date(ret.createdAt);
          ret.createdAt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        }
        if (ret.updatedAt) {
          const date = new Date(ret.updatedAt);
          ret.updatedAt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        }
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

followerSchema.virtual("followerUser", {
  ref: 'User',
  localField: 'followerId',
  foreignField: '_id',
  justOne: true,
})

followerSchema.virtual("followingUser", {
  ref: 'User',
  localField: 'followingId',
  foreignField: '_id',
  justOne: true,
})

followerSchema.post("save", async ({ followerId, followingId }, next) => {
  try {
    await getPublicConnection(followingId)
      .then(async newRoom => await addNewConnection(followerId, newRoom));
  } catch (error) {
    throw new CustomError(400, "Somthing went wrong")
  }
  next()
})

// Create the Follower model
const Follower = mongoose.model("Follower", followerSchema);

export default Follower;
