"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryMemory = void 0;

var _Car = require("../../infra/typeorm/entities/Car");

class CarsRepositoryMemory {
  constructor() {
    this.cars = [];
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    id
  }) {
    const car = new _Car.Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id
    });
    this.cars.push(car);
    return car;
  }

  async findByLincensePlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvaliableCar(brand, category_id, name) {
    const cars = this.cars.filter(car => {
      if (car.available === true || brand && car.brand === brand || category_id && car.category_id === category_id || name && car.name === name) {
        return car;
      }

      return null;
    });
    return cars;
  }

  async findById(id) {
    return this.cars.find(car => car.id === id);
  }

  async updateAvailable(id, available) {
    const findIndex = this.cars.findIndex(car => car.id === id);
    this.cars[findIndex].available = available;
  }

}

exports.CarsRepositoryMemory = CarsRepositoryMemory;