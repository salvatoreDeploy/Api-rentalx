"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoryController = void 0;

var _tsyringe = require("tsyringe");

var _importCategoryUseCase = require("./importCategoryUseCase");

class ImportCategoryController {
  async handle(request, response) {
    const {
      file
    } = request;
    /* console.log(file); */

    const importCategoryUseCase = _tsyringe.container.resolve(_importCategoryUseCase.ImportcategoryUseCase);

    await importCategoryUseCase.execute(file);
    return response.status(201).send();
  }

}

exports.ImportCategoryController = ImportCategoryController;