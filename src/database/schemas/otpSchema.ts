import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        otp: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Number,
            required: true
        }

    }
)
const OTP = mongoose.model('OTP', otpSchema);

export default OTP;