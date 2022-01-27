"use strict";

var _tsyringe = require("tsyringe");

require("./provider");

var _UserRepository = require("../../modules/accounts/infra/typeorm/repositories/UserRepository");

var _CarImageRepository = require("../../modules/cars/infra/typeorm/repositories/CarImageRepository");

var _CarsRepository = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");

var _CategoriesRepository = require("../../modules/cars/infra/typeorm/repositories/CategoriesRepository");

var _SpecificationsRepository = require("../../modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _RentalRepository = require("../../modules/rentals/infra/typeorm/repositories/RentalRepository");

var _UserTokensRepository = require("../../modules/accounts/infra/typeorm/repositories/UserTokensRepository");

// ICategoriesRepository
_tsyringe.container.registerSingleton("CategoriesRepository", _CategoriesRepository.CategoriesRepository); // ISpecificationCategory


_tsyringe.container.registerSingleton("SpecificationsRepository", _SpecificationsRepository.SpecificationsRepository); // IUserRepository


_tsyringe.container.registerSingleton("UserRepository", _UserRepository.UserRepository); // ICarsRepository


_tsyringe.container.registerSingleton("CarsRepository", _CarsRepository.CarsRepository); // ICarImageRepository


_tsyringe.container.registerSingleton("CarImageRepository", _CarImageRepository.CarImageRepository); // IRentalRepository


_tsyringe.container.registerSingleton("RentalRepository", _RentalRepository.RentalRepository); //IUserTokensRepository


_tsyringe.container.registerSingleton("UserTokensRepository", _UserTokensRepository.UserTokensRepository);