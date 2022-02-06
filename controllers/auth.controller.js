const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { uniqueNamesGenerator, names } = require("unique-names-generator");

const User = require("../models/User");

exports.handleLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email });
    let user = foundUser;

    if (!foundUser) {
      user = await User.create({
        email,
        nickname: uniqueNamesGenerator({
          dictionaries: [names],
        }),
        counselor: {
          tag: [],
          validDate: [],
        },
      });
    }

    const accessToken = jwt.sign(user.email, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      result: "success",
      data: null,
    });
  } catch (err) {
    next(createError(err));
  }
};

exports.handleLogout = (req, res, next) => {
  res.clearCookie("accessToken");

  res.status(200).json({
    result: "success",
    data: null,
  });
};
