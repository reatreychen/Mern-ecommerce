// Google OAuth routes
// - GET /auth/google: Kick off OAuth flow
// - GET /google/callback: Handle Google's callback, set JWT cookies, then redirect to frontend
const express = require("express");
const passport = require("passport");
const passportGoogleApi = express.Router();
const generatedAccessToken = require("../utils/generatedAccessToken");
const generateRefreshToken = require("../utils/generatedRefreshToken");

// Step 1: Redirect user to Google to consent for profile and email
passportGoogleApi.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

// Step 2: Google redirects here after consent
// On success: issue JWTs, set as httpOnly cookies, and redirect to the frontend
// On failure: redirect to a JSON error endpoint
passportGoogleApi.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/passport/auth/google/failure", session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      const accessToken = await generatedAccessToken(user._id);
      const refreshToken = await generateRefreshToken(user._id);

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      };
      res.cookie("access_token", accessToken, cookieOptions);
      res.cookie("refresh_token", refreshToken, cookieOptions);

      const allowed = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const primaryFrontend = allowed[0] || "http://localhost:5173";
      const frontendBase = primaryFrontend.replace(/\/$/, "");
      const redirectUrl = `${frontendBase}/?access_token=${encodeURIComponent(accessToken)}&refresh_token=${encodeURIComponent(refreshToken)}`;
      return res.redirect(redirectUrl);
    } catch (err) {
      return res.status(500).json({ message: err.message, error: true, success: false });
    }
  }
);

// Failure endpoint used by passport failureRedirect
passportGoogleApi.get("/auth/google/failure", (_req, res) => {
  res.status(401).json({ message: "Google authentication failed", error: true, success: false });
});

module.exports = passportGoogleApi;