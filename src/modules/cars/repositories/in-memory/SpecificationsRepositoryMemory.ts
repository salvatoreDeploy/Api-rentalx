import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name,
        });

        this.specifications.push(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(
            (specifications) => specifications.name === name
        );
    }
    async list(): Promise<Specification[]> {
        const specification = this.specifications;
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specification = this.specifications.filter((specification) =>
            ids.includes(specification.id)
        );
        return specification;
    }
}

export { SpecificationMemory };
