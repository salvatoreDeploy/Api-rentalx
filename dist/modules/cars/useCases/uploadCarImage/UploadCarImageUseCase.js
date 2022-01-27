"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImageUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ICarImageRepository = require("../../repositories/ICarImageRepository");

var _IStorageProvaider = require("../../../../shared/container/provider/StorageProvaider/IStorageProvaider");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let UploadCarImageUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CarImageRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("StorageProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICarImageRepository.ICarImageRepository === "undefined" ? Object : _ICarImageRepository.ICarImageRepository, typeof _IStorageProvaider.IStorageProvider === "undefined" ? Object : _IStorageProvaider.IStorageProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UploadCarImageUseCase {
  constructor(carsImageRepository, storageProvider) {
    this.carsImageRepository = carsImageRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    car_id,
    images_name
  }) {
    images_name.map(async image => {
      await this.carsImageRepository.create(car_id, image);
      await this.storageProvider.save(image, "cars");
    });
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UploadCarImageUseCase = UploadCarImageUseCase;