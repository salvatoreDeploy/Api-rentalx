"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRoutes = void 0;

var _CreateCategoryController = require("../../../../modules/cars/useCases/createCategory/CreateCategoryController");

var _importCategoryController = require("../../../../modules/cars/useCases/importCategory/importCategoryController");

var _ListCategoryController = require("../../../../modules/cars/useCases/listCategory/ListCategoryController");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticate = require("../middlewares/ensureAuthenticate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categoriesRoutes = (0, _express.Router)();
exports.categoriesRoutes = categoriesRoutes;
const upload = (0, _multer.default)({
  dest: "./tmp"
});
const createCategoryController = new _CreateCategoryController.CreateCategoryController();
const importCategoryController = new _importCategoryController.ImportCategoryController();
const listCategoryController = new _ListCategoryController.ListCategoryController();
categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.get("/", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, listCategoryController.handle);
categoriesRoutes.post("/import", upload.single("file"), _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, importCategoryController.handle);