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

import { AppError } from "@shared/error/AppError";

import { CategoriesRepositoryMemory } from "../../repositories/in-memory/CategoriesRepositoryMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    /* console.log(categoryCreated); */

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError("Category already exists!"));
  });
});
