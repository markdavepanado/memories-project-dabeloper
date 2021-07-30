import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/posts.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, createPost);
router.patch("/:id", authMiddleware, updatePost);
router.patch("/:id/likePost", authMiddleware, likePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
