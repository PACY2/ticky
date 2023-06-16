const HttpException = require("./Http.exception");

class UnauthorizedException extends HttpException {
  constructor() {
    super({ error: "Unauthorized", statusCode: 401 });
  }
}

module.exports = { UnauthorizedException };
