const mongoose = require("mongoose");
const createError = require("http-errors");

const Counsel = require("../models/Counsel");
const { RESPONSE, MESSAGE } = require("../constants");

exports.createCounsel = async (req, res, next) => {
  try {
    const { counselee, title, content, tag, createdAt } = req.body;

    await Counsel.create({
      counselee,
      title,
      content,
      tag,
      createdAt,
    });

    res.status(201).json({
      result: RESPONSE.SUCCESS,
      data: null,
    });
  } catch (err) {
    next(createError(err));
  }
};

exports.getCounselList = async (req, res, next) => {
  try {
    res.status(200).json({
      result: RESPONSE.SUCCESS,
      data: req.pagination,
    });
  } catch (err) {
    next(createError(err));
  }
};

exports.getCounsel = async (req, res, next) => {
  try {
    const { counsel_id } = req.params;

    const counsel = await Counsel.findById(counsel_id)
      .populate("counselors")
      .populate("counselee")
      .lean();

    if (!counsel) {
      next(createError.BadRequest(MESSAGE.BADREQUEST));
      return;
    }

    res.status(200).json({
      result: RESPONSE.SUCCESS,
      data: counsel,
    });
  } catch (err) {
    next(createError(err));
  }
};

exports.updateCounsel = async (req, res, next) => {
  try {
    const { counsel_id } = req.params;
    const { userId } = req.body;

    const { counselors } = await Counsel.findById(counsel_id)
      .select("counselors")
      .lean();

    const isContain = counselors.some(
      (counselorId) => counselorId.toString() === userId.toString()
    );

    if (isContain) {
      next(createError(400, "사연 수락은 한번만 할 수 있습니다."), {
        result: RESPONSE.FAIL,
      });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      next(createError(400, MESSAGE.INVAILD_OBJECT_ID));
      return;
    }

    await Counsel.findByIdAndUpdate(counsel_id, {
      $push: { counselors: userId },
    });

    res.status(201).json({
      result: RESPONSE.SUCCESS,
      data: null,
    });
  } catch (err) {
    if (err.name === "TypeError") {
      next(createError.BadRequest(MESSAGE.BADREQUEST));
      return;
    }

    next(createError(err));
  }
};
