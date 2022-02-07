const mongoose = require("mongoose");
const createError = require("http-errors");

exports.checkObjectId = function (req, res, next) {
  const [paramId] = Object.values(req.params);

  if (mongoose.Types.ObjectId.isValid(paramId)) {
    next();
    return;
  }

  next(createError(400, "유효하지 않은 object id입니다."));
};
