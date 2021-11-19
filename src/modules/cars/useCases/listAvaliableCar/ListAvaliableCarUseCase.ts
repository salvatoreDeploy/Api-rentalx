import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListAvaliableCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRespository: ICarsRepository
    ) {}

    async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
        const cars = await this.carsRespository.findAvaliableCar(
            brand,
            category_id,
            name
        );
        return cars;
    }
}

export { ListAvaliableCarUseCase };
