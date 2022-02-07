const createError = require("http-errors");

const Counsel = require("../models/Counsel");
const { RESPONSE } = require("../constants");

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
