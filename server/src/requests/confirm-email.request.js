const authorize = (request) => {
  const { user } = request.auth;
  return !user.verifiedAt;
};

const confirmEmailRequest = {
  authorize,
};

module.exports = confirmEmailRequest;
