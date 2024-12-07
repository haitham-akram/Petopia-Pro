import OTP from "../../database/schemas/otpSchema";
import { IOtp } from "../../interfaces/iOtp";

const getOTP = async (email: string): Promise < IOtp | null > => {
    const otp = await OTP.findOne({ email });
    return otp
}
export default getOTP