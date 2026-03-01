import express from "express";
import {
  googleAuth,
  signIn,
  signOut,
  signup,
} from "../controllers/auth.controller.js";
const authRouter = express.Router();
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

authRouter.post("/sign-up", upload.single("image"), signup);
authRouter.post("/sign-in", signIn);
authRouter.get("/sign-out", signOut);

authRouter.post("/google", googleAuth);

export default authRouter;
