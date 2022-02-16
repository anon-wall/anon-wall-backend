const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const User = require("../models/User");

exports.handleLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email }).lean();
    let user = foundUser;

    if (!foundUser) {
      user = await User.create({
        email,
        counselor: {
          tag: [],
          availableDates: [],
        },
        imageURL: `https://avatars.dicebear.com/api/croodles/${email}.svg`,
      });
    }

    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      result: "success",
      data: {
        user: {
          _id: user._id,
          imageURL: user.imageURL,
          email: user.email,
          notification: user.notification,
          nickname: user.nickname,
        },
        accessToken,
      },
    });
  } catch (err) {
    next(createError(err));
  }
};
