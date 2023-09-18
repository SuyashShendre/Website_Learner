require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.createToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1d" });
};