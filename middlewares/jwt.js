const jwt = require("jsonwebtoken");
const createError = require("http-errors");

exports.verifyToken = (req, res, next) => {
  jwt.verify(
    res.cookies.accessToken,
    process.env.ACCESS.TOKEN_SECRET,
    (err, user) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          next(createError.Unauthorized());
          return;
        }

        next(createError.Unauthorized(err.message));
        return;
      }

      req.user = user;
      next();
    }
  );
};
