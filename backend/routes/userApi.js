const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/authToken");
const upload = require("../middleware/multer")

// user
userRouter.post("/register", userController.registerUserController);
userRouter.post("/login", userController.loginController);
userRouter.get("/logout", auth, userController.logoutController);
userRouter.put(
  "/upload-avatar",
  auth,
  upload.single("avatar"),
  userController.uploadAvatarController
);
userRouter.put("/update-user-details", auth, userController.updateUserDetails);
// refresh-token should not require access token middleware
userRouter.post("/refresh-token", userController.refreshTokenController);
userRouter.get("/user-detail", auth, userController.getUserDetailsController);

module.exports = userRouter;
