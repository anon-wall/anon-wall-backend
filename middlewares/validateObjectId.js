const mongoose = require("mongoose");
const createError = require("http-errors");

const { MESSAGE } = require("../constants");

exports.checkObjectId = function (req, res, next) {
  const [paramId] = Object.values(req.params);

  if (mongoose.Types.ObjectId.isValid(paramId)) {
    next();
    return;
  }

  next(createError(400, MESSAGE.INVAILD_OBJECT_ID));
};
