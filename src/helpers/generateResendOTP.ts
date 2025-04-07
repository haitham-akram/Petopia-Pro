export const generateResentOTP = (otp: string): string => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #f0f0f5;
                color: black;
                text-align: center;
                padding: 20px;
            }
            .header img {
                max-width: 100px;
                margin-bottom: 10px;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content h1 {
                color: #333;
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #ff903b;
                margin: 20px 0;
            }
            .footer {
                background-color: #f0f0f5;
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <img src="https://i.imgur.com/Dl0z6tl.png" alt="Petopia Logo">
                <h2>Welcome to Petopia!</h2>
            </div>
            <div class="content">
                <h1>We're excited to have you on board!</h1>
                <p>To complete your sigp, please use the OTP below:</p>
                <div class="otp">${otp}</div>
                <p>If you didn't request this, please ignore this email.</p>
            </div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} Petopia. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    `;
};