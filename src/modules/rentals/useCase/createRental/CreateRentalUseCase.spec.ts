import { RentalRepositoryMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryMemory";
import { AppError } from "@shared/error/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/provider/implementaions/DayjsDateProvider";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CarsRepositoryMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryMemory";

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
    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: "1212122",
      expected_return_date: dayAdd24Hours,
    });

    //console.log(rental);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there another open same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "1212122",
        expected_return_date: dayAdd24Hours,
      });

      const rental = await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "1212122",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);

    //console.log(rental);
  });

  it("should not be able to create a new rental if there another open same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "teste",
        expected_return_date: dayAdd24Hours,
      });

      const rental = await createRentalUseCase.execute({
        user_id: "321",
        car_id: "teste",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);

    //console.log(rental);
  });
  it("should not be able to create a new rental with invalid return time ", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "teste",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);

    //console.log(rental);
  });
});
