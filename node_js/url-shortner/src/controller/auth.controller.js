const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const USER = require("../model/user.model");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await USER.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "email already exist",
      });
    }
    const bcryptPassword = await bcrypt.hash(password, 10);
    const created_user = await USER.create({
      username,
      email,
      password: bcryptPassword,
    });
    return res.status(201).json({
      message: "User created successfully",
      created_user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });

  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "email not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "wrong password",
      });
    }
  
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
  
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
  
    return res.status(200).json({
      message: "login successfully",
      email: user.email,
      accessToken,
    });
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getMeUser = async (req, res) => {

  try {
    
    return res.status(200).json({
      message : "User Fetched Successfully",
      user : req.user,
    });

  } catch (error) {

    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });

  }

};

const refreshTokenHandler = async (req, res) => {

  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      return res.status(401).json({
        message: "refreshToken not found",
      });
    }
  
    const decode = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
  
    if(!decode){
      return res.status(401).json({
        message : "Invalid refresh token"
      })
    }
  
    const newAccessToken = generateAccessToken({ _id: decode.id })
    const newRefreshToken = generateRefreshToken({ _id: decode.id })
  
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
  
    return res.status(200).json({
      message: "Access token and Refresh token refreshed successfully",
      accessToken: newAccessToken,
    });

  } catch (error) {

    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });

  }
};

module.exports = {
  registerUser,
  loginUser,
  getMeUser,
  refreshTokenHandler,
};
