import { ICreateCarDTO } from "../infra/dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLincensePlate(license_plate: string): Promise<Car>;
    findAvaliableCar(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]>;
    findById(id: string): Promise<Car>;
}

export { ICarsRepository };
