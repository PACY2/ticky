const { UnauthorizedException } = require("../exceptions/Unauthorized.exception");
const config = require("../lib/config.lib");
const db = require("../lib/database.lib")
const jwt = require("jsonwebtoken")

const authRefreshMiddleware = async (request, _response, next) => {
  const {
    refreshToken
  } = request.cookies

  if (!refreshToken) {
    throw new UnauthorizedException()
  }

  let id;

  try {
    const decoded = jwt.verify(refreshToken, config.SECRET_REFRESH)
    id = decoded.id
  } catch (err) {
    throw new UnauthorizedException();
  }

  const dbRefreshToken = await db.refreshToken.findUnique({
    where: {
      token: refreshToken
    }
  })

  if (!dbRefreshToken) {
    throw new UnauthorizedException()
  }

  const user = db.user.findUnique({
    where: {
      id
    }
  })

  if (!user) {
    throw new UnauthorizedException()
  }

  request.auth = {
    user,
    refreshToken: dbRefreshToken
  }

  return next()
};

module.exports = authRefreshMiddleware;
