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
userRouter.post("/refresh-token", auth, userController.refreshTokenController);
userRouter.get("/user-detail", auth, userController.getUserDetailsController);

module.exports = userRouter;
