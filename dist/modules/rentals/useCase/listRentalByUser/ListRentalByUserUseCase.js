"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalByUserUseCase = void 0;

var _IRentalRepository = require("../../repositories/IRentalRepository");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let ListRentalByUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IRentalRepository.IRentalRepository === "undefined" ? Object : _IRentalRepository.IRentalRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListRentalByUserUseCase {
  constructor(rentalRepository) {
    this.rentalRepository = rentalRepository;
  }

  async execute(user_id) {
    const rentalByUser = await this.rentalRepository.findByUserId(user_id);
    return rentalByUser;
  }

}) || _class) || _class) || _class) || _class);
exports.ListRentalByUserUseCase = ListRentalByUserUseCase;