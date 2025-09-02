// Passport Google OAuth 2.0 configuration
// Expects env vars:
// - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET: from Google Cloud Console
// - BACKEND_URL: base URL of this server (e.g., http://localhost:8080)
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/userModels");

// Configure Google OAuth 2.0 strategy
const rawBackendBaseUrl = process.env.BACKEND_URL || 'http://localhost:8000'
const backendBaseUrl = rawBackendBaseUrl.replace(/\/$/, '') // strip trailing slash
// Helpful debug to verify the redirect URI exactly
console.log("[OAuth] Google callback URL:", `/google/callback`)
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Relative callback lets Google use the current host automatically
      // Google Console Authorized redirect URI must be set to your full URL
      callbackURL: `/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile?.emails?.[0]?.value;
        const name = profile?.displayName || "Google User";
        const avatar = profile?.photos?.[0]?.value || "";

        if (!email) {
          return done(null, false, { message: "Google account has no public email" });
        }

        let user = await UserModel.findOne({ email });
        if (!user) {
          // Create a user with a random password since schema requires it
          const randomPassword = Math.random().toString(36).slice(-12);
          const salt = await bcryptjs.genSalt(10);
          const hashed = await bcryptjs.hash(randomPassword, salt);
          user = await UserModel.create({
            name,
            email,
            password: hashed,
            avatar,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
// No session serialization needed since we use JWTs with session: false
module.exports = passport;


