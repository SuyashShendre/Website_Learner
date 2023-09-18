const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "First Name is Required"],
        },

        lastname: {
            type: String,
            required: [true, "Last Name is Required"],
        },

        email: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Email is Required"],
        },

        password: {
            type: String,
            required: [true, "Password is Required"],
        },

        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],

        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],

    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;