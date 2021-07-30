import mongoose from "mongoose";

const postMessageSchema = mongoose.Schema(
  {
    creator: String,
    title: String,
    message: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const PostMessage = mongoose.model("PostMessage", postMessageSchema);

export default PostMessage;
