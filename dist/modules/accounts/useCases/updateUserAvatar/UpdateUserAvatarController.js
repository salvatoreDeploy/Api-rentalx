"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserAvatarUseCase = require("./UpdateUserAvatarUseCase");

class UpdateUserAvatarController {
  async handle(request, response) {
    const {
      id
    } = request.user;
    const avatar_File = request.file.filename; // Receber Arquivo;

    /* const avatar_File = null; */

    const updateUserAvatarUseCase = _tsyringe.container.resolve(_UpdateUserAvatarUseCase.UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_File
    });
    return response.status(200).send();
  }

}

exports.UpdateUserAvatarController = UpdateUserAvatarController;