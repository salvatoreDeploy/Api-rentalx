"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _bcrypt = require("bcrypt");

var _tsyringe = require("tsyringe");

var _IUserRepository = require("../../repositories/IUserRepository");

var _AppError = require("../../../../shared/error/AppError");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateUserUseCase {
  constructor(userRespository) {
    this.userRespository = userRespository;
  }

  async execute({
    name,
    email,
    password,
    driver_license
  }) {
    const userAlreadyExists = await this.userRespository.findByEmail(email);

    if (userAlreadyExists) {
      throw new _AppError.AppError("User already exists");
    }

    const passwordHash = await (0, _bcrypt.hash)(password, 8);
    await this.userRespository.create({
      name,
      email,
      password: passwordHash,
      driver_license
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;