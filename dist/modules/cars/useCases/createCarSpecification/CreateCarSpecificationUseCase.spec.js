"use strict";

var _CarsRepositoryMemory = require("../../repositories/in-memory/CarsRepositoryMemory");

var _SpecificationsRepositoryMemory = require("../../repositories/in-memory/SpecificationsRepositoryMemory");

var _AppError = require("../../../../shared/error/AppError");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepositoryMemory;
let specificationMemory;
describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryMemory = new _CarsRepositoryMemory.CarsRepositoryMemory();
    specificationMemory = new _SpecificationsRepositoryMemory.SpecificationMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryMemory, specificationMemory);
  });
  it("Should not be able to add a new specification to a now-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _AppError.AppError("Car does not exists"));
  });
  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    const specification = await specificationMemory.create({
      description: "Description test",
      name: "Name test"
    });
    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    }); // console.log(specificationsCars);

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});