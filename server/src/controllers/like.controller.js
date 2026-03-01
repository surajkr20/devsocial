import NotificationModel from "../models/notification.model.js";
import PostModel from "../models/post.model.js";
import { io } from "../app.js";

export const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.userId;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId.toString(),
    );

    if (alreadyLiked) {
      // Unlike logic
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString(),
      );
    } else {
      post.likes.push(userId);

      // prevent self notification
      if (post.user.toString() !== userId.toString()) {
        const notification = await NotificationModel.create({
          sender: userId,
          receiver: post.user,
          post: post._id,
          type: "LIKE",
        });

        const populateNotifications = await NotificationModel.findById(notification._id).populate("sender", "name email image");

        io.to(post.user.toString()).emit("newNotification", populateNotifications);
      }
    }
    await post.save();

    io.emit("likeUpdated", {
      postId: post._id,
      likes: post.likes,
    });

    res.status(200).json({
      success: true,
      likeCount: post.likes.length,
      liked: !alreadyLiked,
    });
  } catch (error) {
    res.status(500).json({
      message: `Like controller error: ${error.message}`,
    });
  }
};
