import express from "express";
import Post from "../models/postModel.js";

const router = express.Router();

// Create
router.post("/", async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});

// Read all
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("user", "username");
  res.json(posts);
});

// Update
router.put("/:id", async (req, res) => {
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ msg: "Post deleted" });
});

// Like
router.post("/:id/like", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.body.userId)) {
    post.likes.push(req.body.userId);
  }
  await post.save();
  res.json(post);
});

// Comment
router.post("/:id/comment", async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ user: req.body.userId, text: req.body.text });
  await post.save();
  res.json(post);
});

export default router;
