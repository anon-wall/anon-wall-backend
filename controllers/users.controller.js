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

exports.updateUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const {
      nickname,
      notification,
      imageURL,
      familyTitle,
      tag,
      shortInput,
      longInput,
    } = req.body;

    const counselor = await User.findByIdAndUpdate(
      user_id,
      {
        $set: {
          nickname: nickname,
          notification: notification,
          imageURL: imageURL,
          "counselor.familyTitle": familyTitle,
          "counselor.tag": [...new Set(tag)],
          "counselor.shortInput": shortInput,
          "counselor.longInput": longInput,
        },
      },
      { new: true }
    ).lean();

    if (!counselor) {
      next(createError.BadRequest(MESSAGE.BAD_REQUEST));
      return;
    }

    res.status(201).json({
      result: RESPONSE.SUCCESS,
      data: counselor,
    });
  } catch (err) {
    next(createError(err));
  }
};
