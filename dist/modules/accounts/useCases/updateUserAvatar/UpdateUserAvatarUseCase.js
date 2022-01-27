"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarUseCase = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = require("../../repositories/IUserRepository");

var _IStorageProvaider = require("../../../../shared/container/provider/StorageProvaider/IStorageProvaider");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let UpdateUserAvatarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("StorageProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _IStorageProvaider.IStorageProvider === "undefined" ? Object : _IStorageProvaider.IStorageProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserAvatarUseCase {
  constructor(userRepository, storageProvaider) {
    this.userRepository = userRepository;
    this.storageProvaider = storageProvaider;
  }

  async execute({
    user_id,
    avatar_File
  }) {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvaider.delete(user.avatar, "avatar");
    }

    await this.storageProvaider.save(avatar_File, "avatar");
    user.avatar = avatar_File;
    await this.userRepository.create(user);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateUserAvatarUseCase = UpdateUserAvatarUseCase;