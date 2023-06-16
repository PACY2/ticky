const { UnauthorizedException } = require("../exceptions/Unauthorized.exception");
const jwt = require("jsonwebtoken");
const config = require("../lib/config.lib");
const db = require("../lib/database.lib");

const authAccessMiddleware = async (request, response, next) => {
  const { accessToken } = request.cookies;

  if (!accessToken) {
    throw new UnauthorizedException();
  }

  let id;

  try {
    const decoded = jwt.verify(accessToken, config.SECRET_ACCESS);
    id = decoded.id;
  } catch (err) {
    throw new UnauthorizedException();
  }

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new UnauthorizedException();
  }

  request.auth = {
    user,
  };

  return next();
};

module.exports = authAccessMiddleware;
