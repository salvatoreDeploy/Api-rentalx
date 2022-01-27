"use strict";

var _CarsRepositoryMemory = require("../../repositories/in-memory/CarsRepositoryMemory");

var _AppError = require("../../../../shared/error/AppError");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUseCase;
let carsRespositoryMemory;
describe("Create Car", () => {
  beforeEach(() => {
    carsRespositoryMemory = new _CarsRepositoryMemory.CarsRepositoryMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRespositoryMemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    expect(car).toHaveProperty("id");
  });
  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Car 1",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    await expect(createCarUseCase.execute({
      name: "Car 2",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    })).rejects.toEqual(new _AppError.AppError("Car already Exists"));
  });
  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    }); // console.log(car);

    expect(car.available).toBe(true);
  });
});