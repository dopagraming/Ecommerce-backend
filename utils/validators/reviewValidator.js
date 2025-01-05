const { check } = require("express-validator")
const validatorMiddleware = require("../../middlewares/validatorMiddleware")
const ReviewModel = require("../../models/reviewModel")

exports.createReviewValidator = [
    check("title").optional(),
    check("rating").notEmpty().withMessage("You must write the rating").isFloat({ min: 1, max: 5 }).withMessage("rating must be between 1 and 5"),
    check("user").isMongoId().withMessage("Invalid review id format"),
    check("product").isMongoId().withMessage("Invalid review id format").custom((value, { req }) => {
        return ReviewModel.findOne({ user: req.user._id, product: req.body.product }).then((review) => {
            if (review) {
                return Promise.reject(new Error('Already reviewed this product'))
            }
        })
    }),
    validatorMiddleware
]

exports.getReviewValidator = [
    check("id").isMongoId().withMessage("Invalid Review id format"),
    validatorMiddleware
]

exports.updateReviewValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Review id format')
        .custom((val, { req }) =>
            // Check review ownership before update
            ReviewModel.findById(val).then((review) => {
                if (!review) {
                    return Promise.reject(new Error(`There is no review with id ${val}`));
                }
                if (review.user._id.toString() !== req.user._id.toString()) {
                    return Promise.reject(
                        new Error(`Your are not allowed to perform this action`)
                    );
                }
            })
        ),
    validatorMiddleware,
];



exports.deleteReviewValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Review id format')
        .custom((val, { req }) => {
            // Check review ownership before update
            if (req.user.role === 'user') {
                return ReviewModel.findById(val).then((review) => {
                    if (!review) {
                        return Promise.reject(
                            new Error(`There is no review with id ${val}`)
                        );
                    }
                    if (review.user._id.toString() !== req.user._id.toString()) {
                        return Promise.reject(
                            new Error(`Your are not allowed to perform this action`)
                        );
                    }
                });
            }
            return true;
        }),
    validatorMiddleware,
];