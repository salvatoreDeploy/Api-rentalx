"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

var _bcrypt = require("bcrypt");

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _IUserRepository = require("../../repositories/IUserRepository");

var _AppError = require("../../../../shared/error/AppError");

var _IUserTokensRepository = require("../../repositories/IUserTokensRepository");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _IDateProvider = require("../../../../shared/container/provider/DateProvider/IDateProvider");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UserTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _IUserTokensRepository.IUserTokensRepository === "undefined" ? Object : _IUserTokensRepository.IUserTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserUseCase {
  constructor(userRepository, userTokensRepository, dayjsDateProvider) {
    this.userRepository = userRepository;
    this.userTokensRepository = userTokensRepository;
    this.dayjsDateProvider = dayjsDateProvider;
  }

  async execute({
    email,
    password
  }) {
    // Usuario Existe:
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.AppError("Email or Password incorrect!");
    } //Dados isolados para criar os dados de Token


    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refreshToken,
      expires_refresh_token_day
    } = _auth.default; // Senha Correta:

    const passwordMatch = await (0, _bcrypt.compare)(password, user.password);

    if (!passwordMatch) {
      throw new _AppError.AppError("Email or Password incorrect!");
    } // Gerar o JWT:


    const token = (0, _jsonwebtoken.sign)({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    }); // Gerar o refresh token apartir do JWT

    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refreshToken
    }); // Expiração refresh token e dias

    const refresh_token_expire_date = this.dayjsDateProvider.addDays(expires_refresh_token_day); //Criação dos Dados para o refresh token

    await this.userTokensRepository.create({
      expire_date: refresh_token_expire_date,
      refresh_token,
      user_id: user.id
    });
    const tokenReturn = {
      token,
      user: {
        name: user.name,
        email: user.email
      },
      refresh_token
    };
    return tokenReturn;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;