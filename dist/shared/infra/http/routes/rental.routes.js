"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalRoutes = void 0;

var _CreateRentalController = require("../../../../modules/rentals/useCase/createRental/CreateRentalController");

var _DevolutionRentalController = require("../../../../modules/rentals/useCase/devolutionRental/DevolutionRentalController");

var _ListRentalByUserController = require("../../../../modules/rentals/useCase/listRentalByUser/ListRentalByUserController");

var _express = require("express");

var _ensureAuthenticate = require("../middlewares/ensureAuthenticate");

const rentalRoutes = (0, _express.Router)();
exports.rentalRoutes = rentalRoutes;
const createRentalController = new _CreateRentalController.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalByUserController = new _ListRentalByUserController.ListRentalByUserController();
rentalRoutes.post("/", _ensureAuthenticate.ensureAuthenticate, createRentalController.handle);
rentalRoutes.post("/devolution/:id", _ensureAuthenticate.ensureAuthenticate, devolutionRentalController.handle);
rentalRoutes.get("/user", _ensureAuthenticate.ensureAuthenticate, listRentalByUserController.handle);