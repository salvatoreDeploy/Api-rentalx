"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _express = require("express");

var _authenticate = require("./authenticate.routes");

var _cars = require("./cars.routes");

var _categories = require("./categories.routes");

var _password = require("./password.routes");

var _rental = require("./rental.routes");

var _specifications = require("./specifications.routes");

var _user = require("./user.routes");

const routes = (0, _express.Router)();
exports.routes = routes;
routes.use("/categories", _categories.categoriesRoutes);
routes.use("/specification", _specifications.specificationRoutes);
routes.use("/users", _user.userRoutes);
routes.use("/cars", _cars.carsRoutes);
routes.use("/rental", _rental.rentalRoutes);
routes.use(_authenticate.authenticateRoutes);
routes.use("/password", _password.passwordRouter);