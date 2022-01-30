import ICreateCarsDTO from "@modules/cars/dtos/ICreateCarsDTO";
import Car from "@modules/cars/typeorm/entities/Car";

import ICarsRepository from "../interfaces/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarsDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const carFound = this.cars.find(
      (car) => car.license_plate === license_plate
    );

    return carFound;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }

      return null;
    });

    return cars;
  }
}

export default CarsRepositoryInMemory;
