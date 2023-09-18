const express = require("express");
const router = express.Router();

const { getUser } = require("./../controllers/users.controllers");
const { requireSignIn } = require("../middlewares/auth.middlewares")

router.get("/:id", requireSignIn, getUser);

module.exports = router;