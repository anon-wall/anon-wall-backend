const createError = require("http-errors");

const Counsel = require("../models/Counsel");
const { RESPONSE } = require("../constants");

exports.createCounsel = async (req, res, next) => {
  try {
    const newCounsel = req.body;

    await Counsel.create(newCounsel);

    res.status(201).json({
      result: RESPONSE.SUCCESS,
      data: null,
    });
  } catch (err) {
    next(createError(err));
  }
};
