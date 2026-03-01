import UserModel from "../models/user.model.js";
import NotificationModel from "../models/notification.model.js";
import { io } from "../app.js";

export const toggleFollowUser = async (req, res) => {
  try {
    const currentUserId = req.userId; // logged in user
    const targetUserId = req.params.id; // profile user

    if (currentUserId === targetUserId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const currentUser = await UserModel.findById(currentUserId);
    const targetUser = await UserModel.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isAlreadyFollowing = currentUser.following.some(
      (id) => id.toString() === targetUserId,
    );

    if (isAlreadyFollowing) {
      // UNFOLLOW
      await UserModel.findByIdAndUpdate(targetUserId, {
        $pull: { followers: currentUserId },
      });

      await UserModel.findByIdAndUpdate(currentUserId, {
        $pull: { following: targetUserId },
      });

      await NotificationModel.findOneAndDelete({
        sender: currentUserId,
        receiver: targetUserId,
        type: "FOLLOW",
      });

      return res.status(200).json({
        message: "Unfollowed successfully",
        isFollowing: false,
      });
    } else {
      // FOLLOW
      await UserModel.findByIdAndUpdate(targetUserId, {
        $addToSet: { followers: currentUserId },
      });

      await UserModel.findByIdAndUpdate(currentUserId, {
        $addToSet: { following: targetUserId },
      });

      const notification = await NotificationModel.create({
        sender: currentUserId,
        receiver: targetUserId,
        type: "FOLLOW",
      });

      const populatedNotification = await notification.populate(
        "sender",
        "name email image",
      );

      io.to(targetUserId.toString()).emit(
        "newNotification",
        populatedNotification,
      );

      return res.status(200).json({
        message: "Followed successfully",
        isFollowing: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
