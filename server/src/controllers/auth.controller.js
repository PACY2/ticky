const jwt = require("jsonwebtoken");
const { compareSync, hashSync } = require("bcrypt");
const BadRequestException = require("../exceptions/BadRequest.exception");
const config = require("../lib/config.lib");
const db = require("../lib/database.lib");
const { ROLES } = require("../lib/constants.lib");
const mailer = require("../lib/mailer.lib");
const { UnauthorizedException } = require("../exceptions/Unauthorized.exception");

const signIn = async (request, response) => {
  const { email, password } = request.body;

  const user = await db.user.findUnique({ where: { email } });

  if (!compareSync(password, user.password)) {
    throw new BadRequestException({ message: "Password is not correct" });
  }

  const accessToken = jwt.sign({ id: user.id }, config.SECRET_ACCESS, { expiresIn: config.DURATION_ACCESS });
  const refreshToken = jwt.sign({ id: user.id }, config.SECRET_REFRESH, { expiresIn: config.DURATION_REFRESH });

  await db.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
    },
  });

  response.cookie("refreshToken", refreshToken, { httpOnly: true });
  response.cookie("accessToken", accessToken, { httpOnly: true });

  delete user.password;

  return response.status(200).json(user);
};

const refresh = async (request, response) => {
  const { refreshToken } = request.auth;
  const user = request.auth.user;

  const newAccessToken = jwt.sign({ id: user.id }, config.SECRET_ACCESS, { expiresIn: config.DURATION_ACCESS });
  const newRefreshToken = jwt.sign({ id: user.id }, config.SECRET_REFRESH, { expiresIn: config.DURATION_REFRESH });

  await db.refreshToken.delete({
    where: {
      token: refreshToken.token,
    },
  });

  await db.refreshToken.create({
    data: {
      token: newRefreshToken,
      userId: user.id,
    },
  });

  response.cookie("accessToken", newAccessToken, { httpOnly: true });
  response.cookie("refreshToken", newRefreshToken, { httpOnly: true });

  return response.sendStatus(204);
};

const signUp = async (request, response) => {
  const { name, email, password, phone, address } = request.body;

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashSync(password, config.SALT),
      address,
      phone,
      roleId: ROLES.MEMBER,
    },
  });

  const accessToken = jwt.sign({ id: user.id }, config.SECRET_ACCESS, { expiresIn: config.DURATION_ACCESS });
  const refreshToken = jwt.sign({ id: user.id }, config.SECRET_REFRESH, { expiresIn: config.DURATION_REFRESH });
  const emailConfirmationToken = jwt.sign({ id: user.id }, config.SECRET_CONFIRM_EMAIL, { expiresIn: config.DURATION_CONFIRM_EMAIL });

  await db.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
    },
  });

  response.cookie("refreshToken", refreshToken, { httpOnly: true });
  response.cookie("accessToken", accessToken, { httpOnly: true });

  delete user.password;

  await mailer.sendMail({
    to: user.email,
    from: config.SMTP_USER,
    subject: "Confirmation Email",
    html: `<!DOCTYPE html><html><body><a href="${config.APP_URL}/confirm-email/${emailConfirmationToken}" >Confirm email</a></body></html>`,
  });

  return response.status(201).json(user);
};

const signOut = async (request, response) => {
  const { refreshToken } = request.auth;

  await db.refreshToken.delete({
    where: {
      token: refreshToken.token,
    },
  });

  response.sendStatus(204);
};

const forgotPassword = async (request, response) => {
  const { email } = request.body;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  const forgotPasswordToken = jwt.sign({ id: user.id }, config.SECRET_FORGOT_PASSWORD, { expiresIn: config.DURATION_FORGOT_PASSWORD });

  mailer.sendMail({
    from: config.SMTP_USER,
    to: email,
    subject: "Forgot Password",
    html: `
      <!DOCTYPE html >
      <html>
      <body>
        <a href="${config.APP_URL}/reset-password/${forgotPasswordToken}" >Reset Password</a>
      </body>
      </html>`,
  });

  return response.sendStatus(204);
};

const resetPassword = async (request, response) => {
  const { token } = request.params;

  const { password } = request.body;

  let id;

  try {
    const decoded = jwt.verify(token, config.SECRET_FORGOT_PASSWORD);
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

  await db.user.update({
    where: {
      id,
    },
    data: {
      password: hashSync(password, config.SALT),
    },
  });

  return response.sendStatus(204);
};

const sendConfirmationEmail = async (request, response) => {
  const { user } = request.auth;

  const emailConfirmationToken = jwt.sign({ id: user.id }, config.SECRET_CONFIRM_EMAIL, { expiresIn: config.DURATION_CONFIRM_EMAIL });

  await mailer.sendMail({
    to: user.email,
    from: config.SMTP_USER,
    subject: "Confirmation Email",
    html: `<!DOCTYPE html><html><body><a href="${config.APP_URL}/confirm-email/${emailConfirmationToken}" >Confirm Email</a></body></html>`,
  });

  return response.sendStatus(204);
};

const confirmEmailAddress = async (request, response) => {
  const { token } = request.params;

  let id;

  try {
    const decoded = jwt.verify(token, config.SECRET_CONFIRM_EMAIL);
    id = decoded.id;
  } catch (err) {
    throw new UnauthorizedException();
  }

  await db.user.update({
    where: {
      id,
    },
    data: {
      verifiedAt: new Date(),
    },
  });

  return response.sendStatus(204);
};

const getProfile = async (request, response) => {
  const { user } = request.auth;
  return response.status(200).json(user);
};

const updatePassword = async (request, response) => {
  const { user } = request.auth;

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashSync(password, config.SALT),
    },
  });

  return response.sendStatus(204);
};

const updateProfile = async (request, response) => {
  const { user } = request.auth;

  const { name, email, phone, address } = request.body;

  if (email) {
    await mailer.sendMail({
      to: email,
      from: config.SMTP_USER,
      subject: "Confirmation Email",
      html: `<!DOCTYPE html><html><body><a href="${config.APP_URL}/confirm-email/${emailConfirmationToken}" >Confirm Email</a></body></html>`,
    });
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      name,
      verifiedAt: email ? null : user.verifiedAt,
      email,
      phone,
      address,
    },
  });

  return response.sendStatus(204);
};

const authController = {
  signIn,
  signUp,
  signOut,
  forgotPassword,
  resetPassword,
  sendConfirmationEmail,
  confirmEmailAddress,
  refresh,
  getProfile,
  updatePassword,
  updateProfile,
};

module.exports = authController;
