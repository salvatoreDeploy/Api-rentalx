import { CarsRepositoryMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryMemory";
import { SpecificationMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryMemory";
import { AppError } from "@shared/error/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryMemory: CarsRepositoryMemory;
let specificationMemory: SpecificationMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryMemory = new CarsRepositoryMemory();
    specificationMemory = new SpecificationMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryMemory,
      specificationMemory
    );
  });

  it("Should not be able to add a new specification to a now-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists"));
  });

  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const specification = await specificationMemory.create({
      description: "Description test",
      name: "Name test",
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    // console.log(specificationsCars);
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
