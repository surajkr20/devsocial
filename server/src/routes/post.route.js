import express from "express";
const postRouter = express.Router();
import {
  create,
  currentPost,
  deletePost,
  read,
  update,
} from "../controllers/post.controller.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() }); // for reading file/image from body
import { isAuth } from "../middleware/isAuth.js";
import { likePost } from "../controllers/like.controller.js";

postRouter.post("/create", isAuth, upload.single("image"), create);
postRouter.patch("/update/:id", upload.single("image"), update);
postRouter.delete("/delete/:id", deletePost);
postRouter.get("/read", read);
postRouter.get("/current/:id", currentPost);

postRouter.put("/:postId/like", isAuth, likePost);

export default postRouter;
