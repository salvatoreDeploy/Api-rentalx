"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticate = ensureAuthenticate;

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = require("../../../error/AppError");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureAuthenticate(request, response, next) {
  const authHeader = request.headers.authorization; //const userTokenRepository = new UserTokensRepository();

  if (!authHeader) {
    throw new _AppError.AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, //secret token
    //"9fe0705645e14a88678b58f35cd984bb"
    //secret refresh token
    _auth.default.secret_token);
    /* console.log(sub); */
    //const userRepository = new UserRepository();
    //const user = await userRepository.findById(user_id);

    request.user = {
      id: user_id
    };
    next();
  } catch {
    throw new _AppError.AppError("Invalid token!", 401);
  }
}