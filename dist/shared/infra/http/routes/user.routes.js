"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _CreateUserController = require("../../../../modules/accounts/useCases/createUser/CreateUserController");

var _ProfileUserController = require("../../../../modules/accounts/useCases/profileUser/ProfileUserController");

var _UpdateUserAvatarController = require("../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _ensureAuthenticate = require("../middlewares/ensureAuthenticate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRoutes = (0, _express.Router)();
exports.userRoutes = userRoutes;
const uploadAvatar = (0, _multer.default)(_upload.default);
const createUserController = new _CreateUserController.CreateUserController();
const updateUserAvatarController = new _UpdateUserAvatarController.UpdateUserAvatarController();
const profileUserController = new _ProfileUserController.ProfileUserController();
userRoutes.post("/", createUserController.handle);
userRoutes.patch("/avatar", _ensureAuthenticate.ensureAuthenticate, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
userRoutes.get("/profile", _ensureAuthenticate.ensureAuthenticate, profileUserController.handle);