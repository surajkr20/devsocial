import express from "express";
const userRouter = express.Router();
import multer from "multer";
import {
  allDBusers,
  authenticatedUser,
  findUserById,
  updateUser,
  userPosts,
  viewUserPostById,
} from "../controllers/user.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import { toggleFollowUser } from "../controllers/followUnfollow.controller.js";
const upload = multer({ storage: multer.memoryStorage() }); // for reading file/image from body

userRouter.get("/current", isAuth, authenticatedUser);
userRouter.get("/all", isAuth, allDBusers);

userRouter.get("/find-user/:id", findUserById);
userRouter.get("/view-posts/:id", viewUserPostById);

userRouter.get("/post", isAuth, userPosts);

userRouter.put("/update", isAuth, upload.single("image"), updateUser);

// follow and unfollow route
userRouter.post("/:id/follow", isAuth, toggleFollowUser);

export default userRouter;
