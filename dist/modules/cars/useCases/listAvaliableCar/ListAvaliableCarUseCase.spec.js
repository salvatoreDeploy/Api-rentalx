"use strict";

var _CarsRepositoryMemory = require("../../repositories/in-memory/CarsRepositoryMemory");

var _ListAvaliableCarUseCase = require("./ListAvaliableCarUseCase");

let listCarUseCase;
let carsRepositoryMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryMemory = new _CarsRepositoryMemory.CarsRepositoryMemory();
    listCarUseCase = new _ListAvaliableCarUseCase.ListAvaliableCarUseCase(carsRepositoryMemory);
  });
  it("should be able to list all avalilable cars", async () => {
    const car = await carsRepositoryMemory.create({
      name: "Audi A3",
      description: "Car Description",
      daily_rate: 140.0,
      license_plate: "ABC-4567",
      fine_amount: 100,
      brand: "Car_Brand",
      category_id: "Car_category"
    });
    const cars = await listCarUseCase.execute({}); // console.log(cars);

    expect(cars).toEqual([car]);
  });
  it("should be able to list all avalilable cars by brand", async () => {
    const car = await carsRepositoryMemory.create({
      name: "Audi A3",
      description: "Car Description",
      daily_rate: 140.0,
      license_plate: "ABC-4567",
      fine_amount: 100,
      brand: "Car_Brand_test",
      category_id: "Car_category"
    });
    const cars = await listCarUseCase.execute({
      brand: "Car_brand_test"
    }); //console.log(cars);

    expect(cars).toEqual([car]);
  });
  it("should be able to list all avalilable cars by name", async () => {
    const car = await carsRepositoryMemory.create({
      name: "Audi A3_test",
      description: "Car Description",
      daily_rate: 140.0,
      license_plate: "ABC-4567",
      fine_amount: 100,
      brand: "Car_Brand",
      category_id: "Car_category"
    });
    const cars = await listCarUseCase.execute({
      name: "Audi A3"
    }); //console.log(cars);

    expect(cars).toEqual([car]);
  });
  it("should be able to list all avalilable cars by category", async () => {
    const car = await carsRepositoryMemory.create({
      name: "Audi A3",
      description: "Car Description",
      daily_rate: 140.0,
      license_plate: "ABC-4567",
      fine_amount: 100,
      brand: "Car_Brand_test",
      category_id: "Car_category_test"
    });
    const cars = await listCarUseCase.execute({
      category_id: "Car_category_test"
    }); //console.log(cars);

    expect(cars).toEqual([car]);
  });
});