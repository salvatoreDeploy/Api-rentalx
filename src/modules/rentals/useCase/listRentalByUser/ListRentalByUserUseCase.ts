import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository
  ) {}
  async execute(user_id: string): Promise<Rental[]> {
    const rentalByUser = await this.rentalRepository.findByUserId(user_id);

    return rentalByUser;
  }
}

export { ListRentalByUserUseCase };
