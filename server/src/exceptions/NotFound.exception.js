const HttpException = require("./Http.exception");

class NotFoundException extends HttpException {
  constructor({ content }) {
    super({ error: "Not Found", content, statusCode: 404 });
  }
}

module.exports = NotFoundException;
