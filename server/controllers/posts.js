import mongoose from "mongoose";

import PostMessage from "../models/PostMessage.js";

export const getPosts = async (req, res, next) => {
  try {
    const postMessages = await PostMessage.find().sort({ createdAt: "desc" });
    res.status(200).json({ postMessages });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createPost = async (req, res, next) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const updatePost = async (req, res, next) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.send("No post with that id");

  const post = req.body;
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.json(updatedPost);
};

export const likePost = async (req, res, next) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.send("No post with that id");

  const post = await PostMessage.findById(_id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res, next) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.send("No post with that id");

  await PostMessage.findByIdAndRemove(_id);
  return res.json({ message: "You have successfully deleted a Post!" });
};
