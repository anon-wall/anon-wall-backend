const mongoose = require("mongoose");
const createError = require("http-errors");

const { MESSAGE } = require("../constants");

exports.checkObjectId = function (req, res, next) {
  const paramIds = Object.values(req.params);

  for (let i = 0; i < paramIds.length; i++) {
    if (!mongoose.Types.ObjectId.isValid(paramIds[i])) {
      next(createError(400, MESSAGE.INVALID_OBJECT_ID));
      return;
    }
  }

  next();
};
