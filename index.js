const express = require("express");
const app = express();

const apiError = require("./src/utils/apiError");
const { globalErrHandler } = require("./src/utils/globalErrHandler");

require("dotenv").config();

require("./src/config/database");

app.use(express.json());

const authRouters = require("./src/routes/auth.routes");
const userRouters = require("./src/routes/users.routes");
const postRouters = require("./src/routes/posts.routes");
const commentRouters = require("./src/routes/comments.routes");

app.use("/api/auth", authRouters);
app.use("/api/users", userRouters);
app.use("/api/posts", postRouters);
app.use("/api/comments", commentRouters);

app.all("*", (req, res, next) => {
    const err = new apiError(`Can't find this route ${req.originalUrl}`, 400);
    next(err);
});

app.use(globalErrHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});