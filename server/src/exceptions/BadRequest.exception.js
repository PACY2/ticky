const HttpException = require("./Http.exception");

class BadRequestException extends HttpException {
  constructor(content) {
    super({ content, error: "Bad Request", statusCode: 400 });
  }
}

module.exports = BadRequestException;
