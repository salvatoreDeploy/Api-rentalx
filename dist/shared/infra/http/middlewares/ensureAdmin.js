"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;

var _UserRepository = require("../../../../modules/accounts/infra/typeorm/repositories/UserRepository");

var _AppError = require("../../../error/AppError");

async function ensureAdmin(request, response, next) {
  const {
    id
  } = request.user;
  const usersRespository = new _UserRepository.UserRepository();
  const user = await usersRespository.findById(id);

  if (!user.isAdmin) {
    throw new _AppError.AppError("User is not Admin");
  }

  return next();
}