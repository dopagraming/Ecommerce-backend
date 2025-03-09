const asyncHandler = require("express-async-handler")
const UserModel = require("../models/userModels")
const jwt = require('jsonwebtoken');
const apiError = require("../utils/apiError");
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const sendMail = require("../utils/sendMail");
const createToken = require("../utils/createToken");
const { log } = require("console");

// @desc    Signup
// @route   GET /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
    // 1- Create user
    const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    // 2- Generate token
    const token = createToken(user._id);
    res.status(201).json({ data: user, token });
});

// @desc    Login
// @route   GET /api/v1/auth/login
// @access  Public

exports.login = asyncHandler(async (req, res, next) => {
    // 1) check if password and email in the body (validation)
    // 2) check if user exist & check if password is correct
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new apiError("email or passwrod incorrect !"))
    }
    // 3) generate token
    const token = createToken(user._id);
    // Delete password from response
    delete user._doc.password;
    // 4) send response to client side
    res.status(200).json({ data: user, token });
})
exports.protect = asyncHandler(async (req, res, next) => {
    // check if token exist, if exist get
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new apiError("You are not login, please login to get access this route", 401))
    }
    // verify token (No Changes happens, expired)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    // Check if user exists 
    const currentUser = await UserModel.findById(decoded.userId);
    if (!currentUser) {
        return next(new apiError("The User That belong to this token dons no longer exist"), 401)
    }
    // Password change after token created (Error)
    if (currentUser.passwordChangeAt) {
        const passwordChangedTime = parseInt(currentUser.passwordChangeAt / 1000, 10)
        if (passwordChangedTime > decoded.iat) {
            return next(new apiError("user recently Changed His Password", 401))
        }
    }
    req.user = currentUser;
    next()
})

exports.allowTo = (...roles) =>
    asyncHandler(async (req, res, next) => {
        console.log(req.user.email)
        if (!roles.includes(req.user.role)) {
            return next(new apiError("You Can't access this route", 403));
        }
        next();
    });

exports.forgetPassword = asyncHandler(async (req, res, next) => {
    // Get user by email
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
        return next(new apiError(`There is no user for this email ${req.body.email}`, 404))
    }
    // if user exist, generate hash reset random number 6 digites, and save it in db
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashResetCode = crypto.createHash('sha256').update(resetCode).digest('hex');
    user.passwordResetCode = hashResetCode;
    user.passwordResetExpired = Date.now() + 10 * 60 * 1000;
    user.passwordResetVerified = false;
    await user.save()
    // via email
    try {
        await sendMail({
            email: user.email,
            subject: `Reset your Lody Shop password`,
            message: `We heard that you lost your Lody Shop password. Sorry about that! 
            \n But don’t worry! You can use the following with this code you can reset your password: 
            \n ${resetCode} 
            \n If you don’t use this code within 10 minutes, it will expire.
            \n Thanks, \n The Lody Shop Team`
        })
    } catch (err) {
        return next(new apiError("Error in Server"), 500)
    }
    res.status(200).json({ status: `Seccess`, message: 'Reset Code Sent To Email' })
})




exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {

    const hashResetCode = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');
    const user = await UserModel.findOne({ passwordResetCode: hashResetCode, passwordResetExpired: { $gt: Date.now() } })
    if (!user) {
        return next(new apiError(`invalid Or Expired Code, Please Try Again`, 404));
    }
    user.passwordResetVerified = true;
    await user.save()
    res.status(200).json({ status: `Seccess` })
})

exports.resetPassword = asyncHandler(async (req, res, next) => {
    // Get user based email
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
        return next(new apiError(`There is no user for this email ${req.body.email}`, 404));
    }
    // chek if code verifyed
    if (!user.passwordResetVerified) {
        return next(new apiError(`Reset code not verifyed`, 404));
    }
    user.password = req.body.newPassword;
    user.passwordResetCode = undefined;
    user.passwordResetExpired = undefined;
    user.passwordResetVerified = undefined;
    await user.save()
    // if everything is ok, generate Token
    const token = createToken(user._id)
    res.status(200).json({ token: token })
})



