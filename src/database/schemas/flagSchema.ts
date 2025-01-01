import mongoose, { Schema } from "mongoose"

const flagSchema = new Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    },
    {
        timestamps: true
    }
)

const Flag = mongoose.model("Flag", flagSchema)

export default Flag