"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvaliableCarUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ICarsRepository = require("../../repositories/ICarsRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let ListAvaliableCarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListAvaliableCarUseCase {
  constructor(carsRespository) {
    this.carsRespository = carsRespository;
  }

  async execute({
    category_id,
    brand,
    name
  }) {
    const cars = await this.carsRespository.findAvaliableCar(brand, category_id, name);
    return cars;
  }

}) || _class) || _class) || _class) || _class);
exports.ListAvaliableCarUseCase = ListAvaliableCarUseCase;