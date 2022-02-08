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
    const stories = await Counsel.find().populate("counselee").lean();

    res.status(200).json({
      result: "success",
      �data: stories,
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

    res.status(201).json({
      result: RESPONSE.SUCCESS,
      data: counsel,
    });
  } catch (err) {
    next(createError(err));
  }
};
