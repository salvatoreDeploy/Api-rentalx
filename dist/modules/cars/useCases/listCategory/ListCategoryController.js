"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoryController = void 0;

var _tsyringe = require("tsyringe");

var _ListCategoryUseCase = require("./ListCategoryUseCase");

class ListCategoryController {
  async handle(request, response) {
    const listCategoryUseCase = _tsyringe.container.resolve(_ListCategoryUseCase.ListCategoryUseCase);

    const all = await listCategoryUseCase.execute();
    return response.json(all);
  }

}

exports.ListCategoryController = ListCategoryController;