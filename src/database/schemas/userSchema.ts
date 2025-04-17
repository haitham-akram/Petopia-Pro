import mongoose, { Schema } from "mongoose";


// Define the User schema
const userSchema = new Schema(
  {

    userName: {
      type: String, // Full name of the user
      // required: true,
      unique: true,
    },
    fullName: {
      type: String, // Full name of the user
      required: true,
    },
    email: {
      type: String, // Email of the user
      required: true,
      unique: true, // Ensure email is unique
    },
    password: {
      type: String, // Make password optional for Google OAuth users
    },
    googleId: {
      type: String, // Store Google ID for OAuth users
      // unique: true, // Ensure no duplicate Google IDs
    },
    userImage: {
      type: String, // URL or path to the user's image
    },
    profileImage: {
      type: String, // URL or path to the user's profile image
    },
    address: {
      type: String, // Address of the user
    },
    phone: {
      type: String, // User's phone number
    },
    bio: {
      type: String, // User's bio
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: String, // Status of the user (active or inactive)
      enum: ['active', 'inactive'], // Enum validation for status
      default: 'active',
      required: true,
    },
    verified: {
      type: Boolean, // Whether the user's email is verified
      default: false,
      required: true,
    },

    followerCount: {
      type: Number, // Number of followers
      default: 0,
      required: true,
    },
    followingCount: {
      type: Number, // Number of people the user is following
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt,
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

userSchema.virtual('followers', {
  ref: 'Follower',
  localField: '_id',
  foreignField: 'followingId',
});

userSchema.virtual('followings', {
  ref: 'Follower',
  localField: '_id',
  foreignField: 'followerId',
});


userSchema.index({ userName: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
// userSchema.index({ googleId: 1 }, { unique: true });
userSchema.index({ status: 1 });
userSchema.index({ isAdmin: 1 });

const User = mongoose.model('User', userSchema);

export default User;
