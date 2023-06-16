const { Router } = require("express");
const validator = require("../middlewares/validator.middleware");
const authController = require("../controllers/auth.controller");
const authAccessMiddleware = require("../middlewares/auth-access.middleware");
const authRefreshMiddleware = require("../middlewares/auth-refresh.middleware");
const signInRequest = require("../requests/sign-in.request");
const signUpRequest = require("../requests/sign-up.request");
const forgotPasswordRequest = require("../requests/forgot-password.request");
const resetPasswordRequest = require("../requests/reset-password.request");
const confirmEmailRequest = require("../requests/confirm-email.request");
const updatePasswordRequest = require("../requests/update-password.request");
const updateProfileRequest = require("../requests/update-password.request");

const authRouter = Router();

authRouter.post("/sign-in", [validator(signInRequest)], authController.signIn);
authRouter.post("/sign-up", [validator(signUpRequest)], authController.signUp);
authRouter.post("/sign-out", [authRefreshMiddleware], authController.signOut);

authRouter.get("/me", [authAccessMiddleware], authController.getProfile);
authRouter.patch("/me", [authAccessMiddleware, validator(updateProfileRequest)], authController.updateProfile);
authRouter.patch("/me-password", [authAccessMiddleware, validator(updatePasswordRequest)], authController.updatePassword);

authRouter.post("/refresh", [authRefreshMiddleware], authController.refresh);

authRouter.post("/forgot-password", [validator(forgotPasswordRequest)], authController.forgotPassword);
authRouter.post("/reset-password/:token", [validator(resetPasswordRequest)], authController.resetPassword);

authRouter.post("/send-confirmation-email", [authAccessMiddleware, validator(confirmEmailRequest)], authController.sendConfirmationEmail);
authRouter.post("/confirm-email/:token", [authAccessMiddleware, validator(confirmEmailRequest)], authController.confirmEmailAddress);

module.exports = authRouter;
