const createError = require("http-errors");

const User = require("../models/User");
const { RESPONSE, MESSAGE } = require("../constants");

exports.getUser = async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail }).lean();

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
      },
    });
  } catch (err) {
    next(createError(err));
  }
};

exports.getCounselor = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const counselor = await User.findById(user_id).lean();

    if (!counselor) {
      next(createError.BadRequest(MESSAGE.BAD_REQUEST));
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
        nickname,
        notification,
        imageURL,
        "counselor.familyTitle": familyTitle,
        "counselor.tag": [...new Set(tag)],
        "counselor.shortInput": shortInput,
        "counselor.longInput": longInput,
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

exports.updateCounselorSchedule = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { type, day, startHour, endHour, startDate, endDate } = req.body;
    const availableDates = await User.findByIdAndUpdate(
      user_id,
      {
        $push: {
          "counselor.availableDates": {
            type,
            day,
            startHour,
            endHour,
            startDate,
            endDate,
          },
        },
      },
      { new: true }
    ).lean();

    res.status(201).json({
      result: RESPONSE.SUCCESS,
      data: availableDates,
    });
  } catch (err) {
    next(createError(err));
  }
};

exports.deleteCounselorSchedule = async (req, res, next) => {
  try {
    const { user_id, id } = req.params;
    const counselor = await User.findByIdAndUpdate(user_id, {
      $pull: { "counselor.availableDates": { _id: id } },
    });

    if (!counselor) {
      next(createError.BadRequest(MESSAGE.BAD_REQUEST));
      return;
    }

    res.status(201).json({
      result: RESPONSE.SUCCESS,
      data: null,
    });
  } catch (err) {
    next(createError(err));
  }
};
