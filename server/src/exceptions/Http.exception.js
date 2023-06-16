class HttpException extends Error {
  constructor({ content, error, statusCode }) {
    super();
    this.content = content;
    this.error = error;
    this.statusCode = statusCode;
  }

  getBody() {
    return {
      statusCode: this.statusCode,
      content: this.content,
      error: this.error,
    };
  }
}

module.exports = HttpException;
