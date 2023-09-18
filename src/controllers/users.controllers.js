const User = require("../models/users.models");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");

exports.getUser = asyncHandler(async (req, res, next) => {
    const document = await User.findById(req.params.id);
    if (!document) {
        return next(new apiError(`No ${name} for this id ${req.params.id}`, 404));
    }
    delete document._doc.password;
    res.status(200).json({ data: document });
});