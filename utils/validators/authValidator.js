const { check, body } = require("express-validator")
const validatorMiddleware = require("../../middlewares/validatorMiddleware")
const { default: slugify } = require("slugify")
const UserModel = require("../../models/userModels")
const bcrypt = require("bcryptjs")

exports.signupValidator = [
    check('name').notEmpty().withMessage("User name require")
        .isLength({ min: 2 }).withMessage("Too Short user name")
        .isLength({ max: 33 }).withMessage("Too Long user name")
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        })
    ,
    check('email').notEmpty().withMessage("email Require")
        .isEmail().withMessage("Invalid email adsress")
        .custom(async (val) => {
            const user = await UserModel.findOne({ email: val })
            if (user) {
                return Promise.reject(new Error('E-mail Already In User'))
            }
            return true
        })
    ,
    check("password").notEmpty().withMessage("Password Require")
        .isLength({ min: 6 }).withMessage("Too Short Password")
        .isLength({ max: 30 }).withMessage("Too Long Password")
        .custom(async (pass, { req }) => {
            const passwordConfirm = await req.body.passwordConfirm
            if (pass !== passwordConfirm) {
                throw new Error("Password Confirm incorrect")
            }
            return true
        })
    ,
    check("passwordConfirm").notEmpty().withMessage("Password Confirm Require"),
    validatorMiddleware
]

exports.loginValidator = [
    check('email').notEmpty().withMessage("email Require")
        .isEmail().withMessage("Invalid email adsress")
    ,
    check("password").notEmpty().withMessage("Password Require")
        .isLength({ min: 6 }).withMessage("Too Short Password")
        .isLength({ max: 30 }).withMessage("Too Long Password")
    ,
    validatorMiddleware
]

