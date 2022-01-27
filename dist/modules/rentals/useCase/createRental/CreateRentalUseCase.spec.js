"use strict";

var _RentalRepositoryMemory = require("../../repositories/in-memory/RentalRepositoryMemory");

var _AppError = require("../../../../shared/error/AppError");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _CarsRepositoryMemory = require("../../../cars/repositories/in-memory/CarsRepositoryMemory");

var _DayjsDateProvider = require("../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalRepositoryMemory;
let dayJsDateProvider;
let carsRepositioryMemory;
describe("Create Rental", () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, "day").toDate();
  beforeEach(() => {
    rentalRepositoryMemory = new _RentalRepositoryMemory.RentalRepositoryMemory();
    carsRepositioryMemory = new _CarsRepositoryMemory.CarsRepositoryMemory();
    dayJsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalRepositoryMemory, dayJsDateProvider, carsRepositioryMemory);
  });
  it("should be able to create a new rental", async () => {
    const car = await carsRepositioryMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    }); //console.log(rental);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("should not be able to create a new rental if there another open same user", async () => {
    const car = await rentalRepositoryMemory.create({
      car_id: "111111",
      expected_return_date: dayAdd24Hours,
      user_id: "123456"
    });
    await expect(createRentalUseCase.execute({
      user_id: "123456",
      car_id: "1212122",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("There's a rental in progress for user!")); //console.log(rental);
  });
  it("should not be able to create a new rental if there another open same car", async () => {
    await rentalRepositoryMemory.create({
      car_id: "teste",
      expected_return_date: dayAdd24Hours,
      user_id: "123456"
    });
    await expect(createRentalUseCase.execute({
      user_id: "321",
      car_id: "teste",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("Car is unavaliable")); //console.log(rental);
  });
  it("should not be able to create a new rental with invalid return time ", async () => {
    await expect(createRentalUseCase.execute({
      user_id: "123",
      car_id: "teste",
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError("Invalid return time!")); //console.log(rental);
  });
});