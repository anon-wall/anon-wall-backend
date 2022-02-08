const createError = require("http-errors");

const User = require("../models/User");
const { RESPONSE, MESSAGE } = require("../constants");

exports.getCounselor = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const counselor = await User.findById(user_id).lean();

    if (!counselor) {
      next(createError.BadRequest(MESSAGE.BADREQUEST));
      return;
    }

    res.status(200).json({
      result: RESPONSE.SUCCESS,
      data: counselor,
    });
  } catch (err) {
    next(createError(err));
  }
};
