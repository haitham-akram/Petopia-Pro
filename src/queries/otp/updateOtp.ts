import OTP from "../../database/schemas/otpSchema";

const updateOTP = async (email: string, data: { otp: string, timestamp: number }) => {
    const otp = await OTP.findOneAndUpdate({ email }, data, { new: true });
    return otp
}
export default updateOTP