import otpGenerator from 'otp-generator';

// Generate OTP
export function generateOTP(length = 6): string {
    return otpGenerator.generate(length, { upperCaseAlphabets: false, specialChars: false });
}

// Verify OTP (matches and checks expiration)
export function verifyOTP(storedOTP: string, enteredOTP: string, timestamp: number, expiryTimeMs = 300000): boolean {
    return storedOTP === enteredOTP && Date.now() - timestamp < expiryTimeMs;
}
