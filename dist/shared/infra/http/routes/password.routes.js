"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRouter = void 0;

var _ResetPasswordUserController = require("../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController");

var _SendForgotPasswordMailController = require("../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController");

var _express = require("express");

const passwordRouter = (0, _express.Router)();
exports.passwordRouter = passwordRouter;
const sendForgotPasswordMailController = new _SendForgotPasswordMailController.SendForgotPasswordMailController();
const resetPasswordUserController = new _ResetPasswordUserController.ResetPasswordUserController();
passwordRouter.post("/forgot", sendForgotPasswordMailController.handle);
passwordRouter.post("/reset", resetPasswordUserController.handle);