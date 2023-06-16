const HttpException = require("../exceptions/Http.exception");

const errorHandlerMiddleware = (error, request, response, next) => {

  if (error instanceof HttpException) {
    return response.status(error.statusCode).json(error.getBody())
  }

  console.log(
    error
  )

  return response.status(500).json({
    error: "Internal Error",
    content: error,
    statusCode: 500
  })

};

module.exports = errorHandlerMiddleware;
