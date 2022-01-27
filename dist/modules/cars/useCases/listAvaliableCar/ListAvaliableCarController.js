"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvaliableController = void 0;

var _tsyringe = require("tsyringe");

var _ListAvaliableCarUseCase = require("./ListAvaliableCarUseCase");

class ListAvaliableController {
  async handle(request, response) {
    const {
      brand,
      name,
      category_id
    } = request.query;

    const listAvaliableCarUseCase = _tsyringe.container.resolve(_ListAvaliableCarUseCase.ListAvaliableCarUseCase);

    const cars = await listAvaliableCarUseCase.execute({
      brand: brand,
      name: name,
      category_id: category_id
    });
    return response.json(cars);
  }

}

exports.ListAvaliableController = ListAvaliableController;