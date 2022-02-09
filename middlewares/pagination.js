const createError = require("http-errors");

const Counsel = require("../models/Counsel");

exports.pagination = async (req, res, next) => {
  try {
    const { page = 1, size = 4, tag, counselor } = req.query;
    const options = {};

    if (tag) {
      options.tag = { $elemMatch: { $eq: tag } };
    }

    if (counselor) {
      options.counselor = { $exists: false };
    }

    const totalCounsel = await Counsel.countDocuments();
    const pageCounsels = await Counsel.find(options)
      .sort({ createdAt: -1 })
      .limit(parseInt(size))
      .skip((page - 1) * parseInt(size))
      .populate("counselee")
      .lean();

    const data = {
      hasPrevPage: true,
      hasNextPage: true,
      pageCounsels,
    };

    if (parseInt(page) === 1) {
      data.hasPrevPage = false;
    }

    if (parseInt(page) * size >= totalCounsel) {
      data.hasNextPage = false;
    }

    req.pagination = data;

    next();
  } catch (err) {
    next(createError(err));
  }
};
