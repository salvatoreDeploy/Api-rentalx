import { getRepository, Repository } from "typeorm";

import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";

class CarImageRepository implements ICarImageRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name,
        });

        await this.repository.save(carImage);

        return carImage;
    }
}

export { CarImageRepository };
