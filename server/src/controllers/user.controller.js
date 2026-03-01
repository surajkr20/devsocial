import bcrypt from "bcryptjs";
import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import uploadFile from "../utils/storage.service.js";

export const authenticatedUser = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.staus(400).json({
        message: "userId not found",
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: `getting error into current user: ${error.message}`,
    });
  }
};

export const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "id not found",
      });
    }

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: `error in the find user by id api: ${error.message}`,
    });
  }
};

export const viewUserPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({
        message: "Unauthorized: User ID not found",
      });
    }

    const posts = await PostModel.find({ user: id })
      .populate("user", "name email image")
      .sort({
        createdAt: -1,
      }); // newest first (better UX)

    return res.status(200).json({
      count: posts.length,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error fetching user's posts: ${error.message}`,
    });
  }
};

export const allDBusers = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.staus(400).json({
        message: "user not authenticated",
      });
    }

    const allUsers = await UserModel.find();

    return res.status(200).json({
      message: "All DB user's fetched successfully",
      users: allUsers,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `fetching db users error: ${error.message}` });
  }
};

export const userPosts = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: User ID not found",
      });
    }

    const posts = await PostModel.find({ user: userId })
      .populate("user", "name email image")
      .sort({
        createdAt: -1,
      }); // newest first (better UX)

    return res.status(200).json({
      count: posts.length,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error fetching user's posts: ${error.message}`,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, password, newpassword } = req.body;

    const userId = req.userId;
    const user = await UserModel.findById(userId).select("+password");

    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!name || !password) {
      return res.status(400).json({
        message: "all fields are required!",
      });
    }

    if (password === newpassword) {
      return res.status(400).json({
        message: "New password must be different from current password",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    const updateData = { name };
    if (newpassword) {
      updateData.password = await bcrypt.hash(newpassword, 10);
    }
    if (req.file) {
      var imageData = await uploadFile(req.file);
      updateData.image = imageData.url;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: `user updation server error: ${error}`,
    });
  }
};
