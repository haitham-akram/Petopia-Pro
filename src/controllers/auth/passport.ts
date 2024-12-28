import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";
import { getUserByEmail } from "../../queries/User";
import addUser from "../../helpers/addUser";
import { generateToken } from "../../helpers/authToken";
config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "/api/v1/auth/google/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                // Check if the user already exists
                let user = await getUserByEmail(profile.emails![0].value);

                if (!user) {
                    // Create a new user
                    user = await addUser({
                        fullName: profile.displayName,
                        email: profile.emails![0].value,
                        googleId: profile.id,
                        isAdmin: false,
                        status: "active",
                        verified: true,
                        followerCount: 0,
                        followingCount: 0,
                    });
                }
                console.log("User", user);
                const token = await generateToken({
                    id: user.id,
                    email: user.email,
                    isAdmin: user.isAdmin,
                });
                console.log("Token", token);
                // Attach token and user to the done callback
                done(null, { token });
            } catch (error) {
                console.error("Error during Google OAuth:", error);
                done(error); // Pass error to the next middleware
            }
        }
    )
);


export default passport;
