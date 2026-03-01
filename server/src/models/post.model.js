import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
    caption: {
      type: String,
    },
    filename: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true },
);

const PostModel = new mongoose.model("post", postSchema);
export default PostModel;
