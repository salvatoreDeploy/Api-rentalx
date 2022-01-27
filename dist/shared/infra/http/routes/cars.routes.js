"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carsRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _CreateCarController = require("../../../../modules/cars/useCases/createCar/CreateCarController");

var _CreateCarSpecificationController = require("../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");

var _ListAvaliableCarController = require("../../../../modules/cars/useCases/listAvaliableCar/ListAvaliableCarController");

var _UploadCarImageController = require("../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticate = require("../middlewares/ensureAuthenticate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carsRoutes = (0, _express.Router)();
exports.carsRoutes = carsRoutes;
const uploadImageCars = (0, _multer.default)(_upload.default);
const createCarController = new _CreateCarController.CreateCarController();
const listAvaliableController = new _ListAvaliableCarController.ListAvaliableController();
const createCarsSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationController();
const uploadCarImageController = new _UploadCarImageController.UploadCarImageController();
carsRoutes.post("/", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, createCarController.handle);
carsRoutes.get("/avaliable", listAvaliableController.handle);
carsRoutes.post("/specifications/:id", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, createCarsSpecificationController.handle);
carsRoutes.post("/images/:id", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, uploadImageCars.array("images"), uploadCarImageController.handle);