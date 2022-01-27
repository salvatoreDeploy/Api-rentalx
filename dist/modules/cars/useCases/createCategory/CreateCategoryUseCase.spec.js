"use strict";

var _AppError = require("../../../../shared/error/AppError");

var _CategoriesRepositoryMemory = require("../../repositories/in-memory/CategoriesRepositoryMemory");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

/* describe("Criar a categoria", () => {
    it("Espero que 2 + 2 seja 4", () => {
        const soma = 2 + 2;
        const resultado = 4;

        expect(soma).toBe(resultado);
    });

    it("Espero que 2 + 2 não seja 5", () => {
        const soma = 2 + 2;
        const resultado = 5;

        expect(soma).not.toBe(resultado);
    });
}); */
let createCategoryUseCase;
let categoriesRepositoryInMemory;
describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryMemory.CategoriesRepositoryMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
    /* console.log(categoryCreated); */

    expect(categoryCreated).toHaveProperty("id");
  });
  it("should not be able to create a new category with name exists", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    await expect(createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })).rejects.toEqual(new _AppError.AppError("Category already exists!"));
  });
});