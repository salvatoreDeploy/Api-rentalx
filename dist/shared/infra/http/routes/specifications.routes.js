"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationRoutes = void 0;

var _CreateSpecificationController = require("../../../../modules/cars/useCases/createSpecification/CreateSpecificationController");

var _ListSpecificationController = require("../../../../modules/cars/useCases/listSpecification/ListSpecificationController");

var _express = require("express");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticate = require("../middlewares/ensureAuthenticate");

const specificationRoutes = (0, _express.Router)();
exports.specificationRoutes = specificationRoutes;
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
const listSpecificationController = new _ListSpecificationController.ListSpecificationController(); // specificationRoutes.use(ensureAuthenticate);

specificationRoutes.post("/", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, createSpecificationController.handle);
specificationRoutes.get("/", _ensureAuthenticate.ensureAuthenticate, _ensureAdmin.ensureAdmin, listSpecificationController.handle);