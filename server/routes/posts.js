import express from "express";

import {
  getPosts,
  getPost,
  getPostsBySearch,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/posts.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", authMiddleware, createPost);
router.patch("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.patch("/:id/likePost", authMiddleware, likePost);

export default router;
