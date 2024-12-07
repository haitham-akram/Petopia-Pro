import OTP from "../../database/schemas/otpSchema";

const deleteOTP = async (email: string) => {
    const otp = await OTP.deleteOne({ email });
    return otp
}
export default deleteOTP