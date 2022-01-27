import { RentalRepositoryMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryMemory";
import { AppError } from "@shared/error/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import dayjs from "dayjs";

import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CarsRepositoryMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryMemory";
import { DayjsDateProvider } from "@shared/container/provider/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryMemory: RentalRepositoryMemory;
let dayJsDateProvider: DayjsDateProvider;
let carsRepositioryMemory: CarsRepositoryMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryMemory = new RentalRepositoryMemory();
    carsRepositioryMemory = new CarsRepositoryMemory();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryMemory,
      dayJsDateProvider,
      carsRepositioryMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositioryMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    //console.log(rental);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there another open same user", async () => {
    const car = await rentalRepositoryMemory.create({
      car_id: "111111",
      expected_return_date: dayAdd24Hours,
      user_id: "123456",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "123456",
        car_id: "1212122",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));

    //console.log(rental);
  });

  it("should not be able to create a new rental if there another open same car", async () => {
    await rentalRepositoryMemory.create({
      car_id: "teste",
      expected_return_date: dayAdd24Hours,
      user_id: "123456",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "teste",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavaliable"));

    //console.log(rental);
  });
  it("should not be able to create a new rental with invalid return time ", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "teste",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));

    //console.log(rental);
  });
});
