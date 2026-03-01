import uploadFile from "../utils/storage.service.js";
import PostModel from "../models/post.model.js";
import mongoose from "mongoose";

export const create = async (req, res) => {
  try {
    const userId = req.userId;

    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }

    const existingImage = await PostModel.findOne({
      filename: req.file?.originalname,
    });
    if (existingImage) {
      return res.status(409).json({
        message: "Duplicate image found! This image already exists",
      });
    }

    const result = await uploadFile(req.file);

    const post = await PostModel.create({
      image: result.url,
      caption: req.body.caption,
      filename: req.file.originalname,
      user: userId,
    });

    return res.status(201).json({
      message: "post created successfully",
      post,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `create post error: ${error.message}` });
  }
};

export const read = async (req, res) => {
  try {
    const post = await PostModel.find()
      .populate("user", "name email image")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All post fethced successfully",
      post,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `create post error: ${error.message}` });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update caption always
    post.caption = req.body.caption || post.caption;

    // Update image only if new file uploaded
    if (req.file) {
      const result = await uploadFile(req.file);
      post.image = result.url;
      post.filename = req.file.originalname;
    }

    await post.save();

    return res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: `update post error: ${error.message}`,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    await PostModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "post deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `delete post error: ${error.message}` });
  }
};

export const currentPost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: `invalid post id`,
      });
    }

    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(400).json({
        message: `post not available`,
      });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `current post error from server: ${error.message}` });
  }
};
