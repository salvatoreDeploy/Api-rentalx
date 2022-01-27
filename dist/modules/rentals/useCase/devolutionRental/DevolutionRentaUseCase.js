"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalUsecase = void 0;

var _ICarsRepository = require("../../../cars/repositories/ICarsRepository");

var _IRentalRepository = require("../../repositories/IRentalRepository");

var _IDateProvider = require("../../../../shared/container/provider/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/error/AppError");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let DevolutionRentalUsecase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalRepository.IRentalRepository === "undefined" ? Object : _IRentalRepository.IRentalRepository, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DevolutionRentalUsecase {
  constructor(rentalRepository, carsRepository, dayDateProvider) {
    this.rentalRepository = rentalRepository;
    this.carsRepository = carsRepository;
    this.dayDateProvider = dayDateProvider;
  }

  async execute({
    id,
    user_id
  }) {
    const minimum_daily = 1;
    const rental = await this.rentalRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new _AppError.AppError("Rental does not exists");
    } // Verificar o tempo de aluguel?


    const dateNow = this.dayDateProvider.dateNow(); //Vefificar a diaria

    let daily = this.dayDateProvider.compareInDays(rental.start_date, this.dayDateProvider.dateNow());

    if (daily <= 0) {
      daily = minimum_daily;
    } //end
    //Verifica Atraso e soma multa


    const delay = this.dayDateProvider.compareInDays(dateNow, rental.expected_return_date);
    let total = 0;

    if (delay > 0) {
      const caclculate_fine = delay * car.fine_amount;
      total = caclculate_fine;
    } //end
    //Valor da Diaria referente a data de entrega


    total += daily * car.daily_rate;
    rental.end_date = this.dayDateProvider.dateNow();
    rental.total = total; //end
    //Persistencia no Banco

    await this.rentalRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true); //end

    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.DevolutionRentalUsecase = DevolutionRentalUsecase;