const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const bcrypt = require("bcrypt");
const { sequelize } = require('../sequelize');
const AppError = require('../utils/appError');

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const comparePassword = async (password, hashedPassword) => {
    const status = await bcrypt.compare(password, hashedPassword);
    return status;
}

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
    // Hashing password for security reasonse
    req.body.role = "User";
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    // Creating new user
    const newUser = await sequelize.models.User.create(req.body);

    // Send response
    res.status(201).json({
        status: true,
        message: "User successfully registered",
        user: newUser.username,
        user_UID: newUser.user_UID
    });
});

exports.login = catchAsync(async (req, res, next) => {
    // Getting user info
    const user = await sequelize.models.User.findOne({ where: { username: req.body.username }, attributes: ["password","user_UID"] });

    if(!user) return next(new AppError("Email doesn't exists", 400));

    const status = await comparePassword(req.body.password, user.password);
    console.log(status);
    if(!status) return next(new AppError("Incorrect password", 400));

    // Generating token
    const token = generateToken(user.user_UID);

    // Send response
    res.status(201).json({
        status: true,
        message: "User successfully login",
        token
    });
});
