import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUsecase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dayDateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const minimum_daily = 1;

    const rental = await this.rentalRepository.findById(id);

    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError("Rental does not exists");
    }

    // Verificar o tempo de aluguel?
    const dateNow = this.dayDateProvider.dateNow();

    //Vefificar a diaria
    let daily = this.dayDateProvider.compareInDays(
      rental.start_date,
      this.dayDateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }
    //end

    //Verifica Atraso e soma multa
    const delay = this.dayDateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const caclculate_fine = delay * car.fine_amount;
      total = caclculate_fine;
    }
    //end

    //Valor da Diaria referente a data de entrega
    total += daily * car.daily_rate;

    rental.end_date = this.dayDateProvider.dateNow();

    rental.total = total;
    //end

    //Persistencia no Banco
    await this.rentalRepository.create(rental);

    await this.carsRepository.updateAvailable(car.id, true);

    //end

    return rental;
  }
}

export { DevolutionRentalUsecase };
