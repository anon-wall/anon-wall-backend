const jwt = require("jsonwebtoken");
const createError = require("http-errors");

exports.verifyToken = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    next(createError.Unauthorized("로그인이 필요한 유저입니다."));
    return;
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      switch (err.name) {
        case "JsonWebTokenError":
          next(createError.BadRequest("토큰이 필요합니다."));
          return;
        case "TokenExpiredError":
          next(createError.BadRequest("토큰이 만료되었습니다."));
          return;
        default:
          next(createError.Unauthorized("유효하지 않은 토큰입니다."));
      }
    }

    next();
  });
};
