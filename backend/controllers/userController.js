const UserModel = require("../models/userModels");
const bcryptjs = require("bcryptjs");
const generatedAccessToken = require("../utils/generatedAccessToken");
const generateRefreshToken = require("../utils/generatedRefreshToken");
const uploadCloudinary = require("../utils/uploadCloudinary");
const jwt = require("jsonwebtoken")
// register constroller
exports.registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide all fields",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Already registered email",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = new UserModel({ name, email, password: hashPassword });
    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      data: savedUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};


// login controller
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Please provide email and password",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(401).json({
        message: "User is not active",
        error: true,
        success: false,
      });
    }
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      res.status(401).json({
        message: "Invalid password",
        error: true,
        success: false,
      });
    }
    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      samSite: "None",
    };
    res.cookie("access_token", accessToken, cookieOptions);
    res.cookie("refresh_token", refreshToken, cookieOptions);
    return res.json({
      message: "Logged in successfully",
      success: true,
      error: false,
      data: {
        user: user,
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};
// logout controller
exports.logoutController = async (req, res) => {
  try {
    const userid = req.userId; // middleware
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      samSite: "None",
    };
    res.clearCookie("access_token", cookieOptions);
    res.clearCookie("refresh_token", cookieOptions);
    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });
    return res.json({
      message: "Logged out successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};

// upload user avatar

exports.uploadAvatarController = async (req, res) => {
  try {
    const userId = req.userId; // auth middleware
    const image = req.file; // multer middleware
    const upload = await uploadCloudinary(image);

    const updateUserAvatar = await UserModel.findByIdAndUpdate(userId, 
      {avatar: upload.url},
      { new: true }
    );

    return res.status(200).json({
      message: "Avatar uploaded successfully",
      data: updateUserAvatar,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};

// update user details
exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.userId; // auth middleware
    const { name, email, mobile, password } = req.body;

    let hashPassword = "";
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }
    const updateUserDetails = await UserModel.findByIdAndUpdate(userId, {
      ...(name && { name: name }),
      ...(email && { email: email }),
      ...(mobile && { mobile: mobile }),
      ...(password && { password: hashPassword }),
    });
    return res.status(200).json({
      message: "User details updated successfully",
      data: updateUserDetails,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};


// refresh token controller
exports.refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token || req.headers.authorization.split("")[1]; // Bearer token
    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token is missing",
        error: true,
        success: false,
      });
    }

    const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)
    if (!verifyToken) {
      return res.status(401).json({
        message: "token is expired",
        error: true,
        success: false,
      });
    }
    console.log ("verifyToken: " , verifyToken);
    const userId = verifyToken._id
    const newAccessToken = await generatedAccessToken(userId)
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      samSite: "None",
    };
    res.cookie("access_token", newAccessToken, cookieOptions);
    return res.json({
      message: "Token refreshed successfully",
      data: {
        access_token: newAccessToken,
      },
      success: true,
      error: false,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};

// user details controller
exports.getUserDetailsController = async (req, res) => {
  try {
    const userId = req.userId;
    const userDetails = await UserModel.findById(userId);
    return res.status(200).json({
      message: "User details fetched successfully",
      data: userDetails,
      success: true,
      error: false,
    });
  } catch (error) {
     res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};
