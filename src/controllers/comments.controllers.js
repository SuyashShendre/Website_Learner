const asyncHandler = require("express-async-handler");
const Comment = require("../models/comments.models");
const Post = require("../models/posts.models");
const User = require("../models/users.models");

exports.createComment = asyncHandler(async (req, res) => {
    const comment = await Comment.create(req.body);

    await Post.findByIdAndUpdate(
        req.post._id,
        {
            $addToSet: { comments: comment._id },
        },
        { new: true }
    );

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: { comments: comment._id },
        },
        { new: true }
    );

    res.status(201).json({ data: comment });
});

exports.updateComment = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Comment.findByIdAndUpdate(id, req.body, { new: true });

    if (!document) {
        return next(new apiError(`No comment for this id ${id}`, 404));
    }

    if (document.user.toString() !== req.user._id.toString()) {
        return next(new apiError(`You are not allowed to delete this post`, 403));
    }

    document.save();
    res.status(200).json({ data: document });
});

exports.getComment = asyncHandler(async (req, res, next) => {
    const document = await Comment.findById(req.params.id);
    if (!document) {
        return next(new apiError(`No comment for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
});

exports.getComments = asyncHandler(async (req, res, next) => {
    const document = await Comment.find();

    res.status(200).json({ size: document.length, data: document });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
    const document = await Comment.findByIdAndDelete(req.params.id);

    if (!document) {
        return next(new apiError(`No comment for this id ${req.params.id}`, 404));
    }

    if (document.user.toString() !== req.user._id.toString()) {
        return next(new apiError(`You are not allowed to delete this post`, 403));
    }

    document.remove();
    res.status(204).send();
});
