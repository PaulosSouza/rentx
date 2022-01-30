import { getRepository, Repository } from "typeorm";

import ICreateCarsDTO from "@modules/cars/dtos/ICreateCarsDTO";
import ICarsRepository from "@modules/cars/repositories/interfaces/ICarsRepository";

import Car from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate,
    });

    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("car")
      .where("car.available = :available", { available: true });

    if (brand) carsQuery.andWhere("car.brand = :brand", { brand });

    if (name) carsQuery.andWhere("car.name = :name", { name });

    if (category_id)
      carsQuery.andWhere("car.category_id = :category_id", { category_id });

    const cars = await carsQuery.getMany();

    return cars;
  }
}

export default CarsRepository;
