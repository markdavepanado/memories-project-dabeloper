import mongoose from "mongoose";

const postMessageSchema = mongoose.Schema(
  {
    name: String,
    creator: String,
    title: String,
    message: String,
    tags: [String],
    selectedFile: String,
    likes: {
      type: [String],
      default: [],
    },
    comments: { type: [String], default: [] },
  },
  { timestamps: true }
);

const PostMessage = mongoose.model("PostMessage", postMessageSchema);

export default PostMessage;
