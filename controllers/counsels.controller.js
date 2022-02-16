const mongoose = require("mongoose");
const createError = require("http-errors");

const Counsel = require("../models/Counsel");
const { RESPONSE, MESSAGE } = require("../constants");

exports.createCounsel = async (req, res, next) => {
  try {
    const { counselee, counselors, title, content, tag, createdAt } = req.body;

    await Counsel.create({
      counselee,
      counselors,
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
    const { page = 1, limit = 6, tag, counselor, counselee } = req.query;
    const sortBy = req.query.sort || { createdAt: -1 };
    const options = {
      ...(!!tag && { $elemMatch: { $eq: tag } }),
      ...(!!counselor && { $exists: false }),
      ...(!!counselee && { $eq: counselee }),
    };

    const totalCounsel = await Counsel.countDocuments();
    const pageCounsels = await Counsel.find(options)
      .sort(sortBy)
      .limit(parseInt(limit))
      .skip((page - 1) * parseInt(limit))
      .populate("counselee")
      .lean();

    const storyList = {
      hasPrevPage: true,
      hasNextPage: true,
      pageCounsels,
    };

    if (parseInt(page) === 1) {
      storyList.hasPrevPage = false;
    }

    if (parseInt(page) * limit >= totalCounsel) {
      storyList.hasNextPage = false;
    }

    res.status(200).json({
      result: RESPONSE.SUCCESS,
      data: storyList,
    });
  } catch (err) {
    next(createError(err));
  }
};

exports.getReservedCounselList = async (req, res, next) => {
  try {
    const { page = 1, limit = 6, counselor, counselee, sort } = req.query;
    const sortBy = sort || { startDate: 1 };
    const isValidCounselee = mongoose.Types.ObjectId.isValid(counselee);
    const isValidCounselor = mongoose.Types.ObjectId.isValid(counselor);
    let options;

    if (isValidCounselee && isValidCounselor) {
      next(createError.BadRequest(MESSAGE.BAD_REQUEST));
      return;
    }

    if (isValidCounselee) {
      options = {
        $and: [
          { endDate: { $gte: new Date().toISOString() } },
          { counselee: counselee },
        ],
      };
    } else if (isValidCounselor) {
      options = {
        $and: [
          { endDate: { $gte: new Date().toISOString() } },
          { counselor: counselor },
        ],
      };
    } else {
      next(createError.BadRequest(MESSAGE.BAD_REQUEST));
      return;
    }

    const reservedTotalCounsels = await Counsel.find(options).countDocuments();
    const pageCounsels = await Counsel.find(options)
      .sort(sortBy)
      .limit(parseInt(limit))
      .skip((page - 1) * parseInt(limit))
      .populate("counselee counselor")
      .lean();

    const storyList = {
      hasPrevPage: true,
      hasNextPage: true,
      pageCounsels,
    };

    if (parseInt(page) === 1) {
      storyList.hasPrevPage = false;
    }

    if (parseInt(page) * limit >= reservedTotalCounsels) {
      storyList.hasNextPage = false;
    }

    res.status(200).json({
      result: RESPONSE.SUCCESS,
      data: storyList,
    });
  } catch (err) {
    next(createError(err));
  }
};

exports.getCounsel = async (req, res, next) => {
  try {
    const { counsel_id } = req.params;
    const counsel = await Counsel.findById(counsel_id)
      .populate("counselee counselors")
      .lean();

    if (!counsel) {
      next(createError.BadRequest(MESSAGE.BAD_REQUEST));
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
    const { counselor, startDate, endDate } = req.body;
    const { counselors } = await Counsel.findById(counsel_id)
      .select("counselors")
      .lean();

    const isIncluded = String(counselors).includes(counselor);

    if (!isIncluded) {
      next(createError(403, MESSAGE.UNAUTHORIZED), {
        result: RESPONSE.FAIL,
      });
      return;
    }

    const isAvailable = startDate.valueOf() < endDate.valueOf();

    if (!isAvailable) {
      next(createError(400, MESSAGE.UNAVAILABLE_DATE), {
        result: RESPONSE.FAIL,
      });
      return;
    }

    await Counsel.findByIdAndDelete(counselor);

    await Counsel.findByIdAndUpdate(
      counsel_id,
      { counselor, startDate, endDate },
      { upsert: true }
    );

    res.status(201).json({
      result: RESPONSE.SUCCESS,
      data: null,
    });
  } catch (err) {
    next(createError(err));
  }
};

exports.updateCounselors = async (req, res, next) => {
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
      next(createError(400, MESSAGE.DUPLICATE_REQUEST), {
        result: RESPONSE.FAIL,
      });
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
      next(createError.BadRequest(MESSAGE.BAD_REQUEST));
      return;
    }

    next(createError(err));
  }
};
