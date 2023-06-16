const BadRequestException = require("../exceptions/BadRequest.exception");
const { UnauthorizedException } = require("../exceptions/Unauthorized.exception");

const validatorMiddleware = (customRequest) => {
  return async (request, _response, next) => {
    const { validate, authorize } = customRequest;

    if (authorize) {
      const authorized = await authorize(request);

      if (!authorized) {
        throw new UnauthorizedException();
      }
    }

    if (validate) {
      const validated = await validate(request);

      if (!validated.success) {
        throw new BadRequestException(validated.error.issues);
      }

      request.body = validated.data;
    }

    return next();
  };
};

module.exports = validatorMiddleware;
