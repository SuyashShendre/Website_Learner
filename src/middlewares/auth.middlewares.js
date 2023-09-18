const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/users.models");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");

exports.requireSignIn = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(
            new apiError(
                "You are not login, Please login to get access this route",
                401
            )
        );
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET,
        function (err, decoded) {
            if (err) {
                if (err.name === "JsonWebTokenError") {
                    next(new apiError(err.message));
                }
            } else {
                return decoded;
            }
        }
    );

    if (decoded) {
        const user = await User.findById(decoded.user._id);
        if (!user) {
            return next(
                new apiError(
                    "The user that belong to this token does no longer exist",
                    401
                )
            );
        }

        req.user = user;

        next();
    }
});

