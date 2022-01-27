"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordUserUseCase = void 0;

var _IUserRepository = require("../../repositories/IUserRepository");

var _IUserTokensRepository = require("../../repositories/IUserTokensRepository");

var _IDateProvider = require("../../../../shared/container/provider/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/error/AppError");

var _tsyringe = require("tsyringe");

var _bcrypt = require("bcrypt");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let ResetPasswordUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserTokensRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUserTokensRepository.IUserTokensRepository === "undefined" ? Object : _IUserTokensRepository.IUserTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordUserUseCase {
  constructor(userTokenRepository, dayjsDateProvider, userRespository) {
    this.userTokenRepository = userTokenRepository;
    this.dayjsDateProvider = dayjsDateProvider;
    this.userRespository = userRespository;
  }

  async execute({
    token,
    password
  }) {
    const userToken = await this.userTokenRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new _AppError.AppError("Token invalid");
    }

    if (this.dayjsDateProvider.compareIfBefore(userToken.expire_date, this.dayjsDateProvider.dateNow())) {
      throw new _AppError.AppError("Token expired");
    }

    const user = await this.userRespository.findById(userToken.user_id);
    user.password = await (0, _bcrypt.hash)(password, 8);
    await this.userRespository.create(user);
    await this.userTokenRepository.deleteById(userToken.id);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ResetPasswordUserUseCase = ResetPasswordUserUseCase;