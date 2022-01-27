"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordMailUseCase = void 0;

var _IUserRepository = require("../../repositories/IUserRepository");

var _IUserTokensRepository = require("../../repositories/IUserTokensRepository");

var _AppError = require("../../../../shared/error/AppError");

var _tsyringe = require("tsyringe");

var _path = require("path");

var _uuid = require("uuid");

var _IDateProvider = require("../../../../shared/container/provider/DateProvider/IDateProvider");

var _IMailProvider = require("../../../../shared/container/provider/MailProvider/IMailProvider");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

let SendForgotPasswordMailUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UserTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)("MailProvider")(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _IUserTokensRepository.IUserTokensRepository === "undefined" ? Object : _IUserTokensRepository.IUserTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _IMailProvider.IMailProvider === "undefined" ? Object : _IMailProvider.IMailProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class SendForgotPasswordMailUseCase {
  constructor(userRepository, userTokensRepository, dayjsDateProvider, etherealMailProvider) {
    this.userRepository = userRepository;
    this.userTokensRepository = userTokensRepository;
    this.dayjsDateProvider = dayjsDateProvider;
    this.etherealMailProvider = etherealMailProvider;
  }

  async execute(email) {
    const user = await this.userRepository.findByEmail(email);
    const templateHtml = (0, _path.resolve)(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");

    if (!user) {
      throw new _AppError.AppError("User does not exists!");
    }

    const token = (0, _uuid.v4)();
    const expire_date = this.dayjsDateProvider.addHours(3);
    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expire_date
    });
    const variables = {
      name: user.name,
      //link: `http://localhost:3333/password/reset?token=${token}`,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    };
    await this.etherealMailProvider.sendMail(email, "Recuperação de Senha", variables, templateHtml);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.SendForgotPasswordMailUseCase = SendForgotPasswordMailUseCase;