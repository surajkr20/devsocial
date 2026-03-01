import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import uploadFile from "../utils/storage.service.js";
import { createUser } from "../services/user.service.js";
import { TokenGenerate } from "../utils/generateToken.js";
import admin from "../utils/firebaseAdmin.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existUser = await UserModel.findOne({ email }).select("+password");
    if (existUser) {
      return res.status(404).json({
        message: `user already exist`,
      });
    }

    // password hashed
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      name,
      email,
      password: hashedPassword,
      provider: "local"
    }

    // image upload on imageKit cloud
    if (req.file) {
      var imageData = await uploadFile(req.file);
      data.image = imageData.url
    }

    // sending data into user services for user creation
    const newUser = await createUser(data);

    // token generation
    const token = await TokenGenerate(newUser._id);

    // cookie setup
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });
  } catch (error) {
    return res.status(500).json({
      message: `signup error from server: ${error.message}`,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await UserModel.findOne({ email }).select("+password");
    if (!userExist) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    if (userExist.provider !== "local") {
      return res.status(400).json({
        message: "Please login using Google",
      });
    }

    const verifyPassword = await bcrypt.compare(password, userExist.password);
    if (!verifyPassword) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = await TokenGenerate(userExist._id);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    return res.status(200).json({
      message: "Login successful",
      user: userExist,
    });
  } catch (error) {
    return res.status(500).json({
      message: `sign-in error from server: ${error}`,
    });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "user sign-out successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: `sign out error ${error}` });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        message: "Token required",
      });
    }

    // Verify token with Firebase
    const decoded = await admin.auth().verifyIdToken(idToken);

    const { email, name, picture } = decoded;

    let user = await UserModel.findOne({ email });

    // If user doesn't exist → create
    if (!user) {
      user = await createUser({
        name,
        email,
        image: picture,
        provider: "google",
      });
    }

    // token generation
    const token = await TokenGenerate(user._id);

    // cookie setup
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    return res.status(200).json({
      message: "Google authentication successful",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
