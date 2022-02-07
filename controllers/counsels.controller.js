const createError = require("http-errors");

const Counsel = require("../models/Counsel");
const { RESPONSE, MESSAGE } = require("../constants");

exports.createCounsel = async (req, res, next) => {
  try {
    const { counselee, counselor, title, content, tag, createdAt } = req.body;

    await Counsel.create({
      counselee,
      counselor,
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

exports.getAll = async (req, res, next) => {
  try {
    const { counsel_id } = req.params;

    const counsel = await Counsel.findById(counsel_id)
      .populate("counselors")
      .lean();

    res.status(201).json({
      result: RESPONSE.SUCCESS,
      data: counsel,
    });
  } catch (err) {
    if (err.name === "CastError") {
      next(createError.BadRequest(MESSAGE.BADREQUEST));
      return;
    }

    next(createError(err));
  }
};
