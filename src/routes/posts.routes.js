const express = require("express");
const router = express.Router();

const { createPost, getPosts, getPost, updatePost, deletePost } = require("./../controllers/posts.controllers");
const { requireSignIn } = require("../middlewares/auth.middlewares")

router.post("/", requireSignIn, createPost);
router.get("/", requireSignIn, getPosts);
router.get("/:id", requireSignIn, getPost);
router.put("/:id", requireSignIn, updatePost);
router.delete("/:id", requireSignIn, deletePost);

module.exports = router;