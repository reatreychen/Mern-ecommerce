const express = require("express");
const passport = require("passport");
const passportGoogleApi = express.Router();
const generatedAccessToken = require("../utils/generatedAccessToken");
const generateRefreshToken = require("../utils/generatedRefreshToken");

passportGoogleApi.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

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
        secure: true,
        sameSite: "None",
      };
      res.cookie("access_token", accessToken, cookieOptions);
      res.cookie("refresh_token", refreshToken, cookieOptions);

      const redirectUrl = `${process.env.FRONTEND_URL}/?access_token=${encodeURIComponent(accessToken)}&refresh_token=${encodeURIComponent(refreshToken)}`;
      return res.redirect(redirectUrl);
    } catch (err) {
      return res.status(500).json({ message: err.message, error: true, success: false });
    }
  }
);

passportGoogleApi.get("/auth/google/failure", (_req, res) => {
  res.status(401).json({ message: "Google authentication failed", error: true, success: false });
});

module.exports = passportGoogleApi;