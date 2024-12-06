import OTP from "../../database/schemas/otpSchema";
import { IOtp } from "../../interfaces/iOtp";

const storeOTP = async (data: IOtp) => {
    const otp = await OTP.create(data);
    otp.save();
    return otp
}
export default storeOTP