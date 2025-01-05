const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModels");

exports.addToWishlist = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: { wishlist: req.body.productId }
        },
        { new: true }
    )
    res.status(200).json({
        status: 'success',
        message: 'Product added successfully to your wishlist.',
        data: user.wishlist,
    });
})

exports.deleteFromWishlist = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findByIdAndDelete(
        req.user._id,
        {
            $pull: { wishList: req.body.productId }
        }
    )
    res.status(200).json({
        status: 'success',
        message: 'Product removed successfully from your wishlist.',
        data: user.wishlist,
    });
})

exports.getWishlist = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findById(req.user._id)
    res.status(200).json({
        status: 'success',
        results: user.wishlist.length,
        data: user.wishlist,
    });
})