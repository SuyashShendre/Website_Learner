const express = require("express");
const router = express.Router();

const { createComment, getComments, getComment, updateComment, deleteComment } = require("./../controllers/comments.controllers");
const { requireSignIn } = require("../middlewares/auth.middlewares")

router.post("/", requireSignIn, createComment);
router.get("/", requireSignIn, getComments);
router.get("/:id", requireSignIn, getComment);
router.put("/:id", requireSignIn, updateComment);
router.delete("/:id", requireSignIn, deleteComment);

module.exports = router;