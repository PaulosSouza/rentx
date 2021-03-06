import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
import IUpdateRentalDTO from "@modules/rentals/dtos/IUpdateRentalDTO";
import Rental from "@modules/rentals/typeorm/entities/Rental";

import IRentalsRepository from "../interfaces/IRentalRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }

  async update({
    id,
    start_date,
    user_id,
    expected_return_date,
    car_id,
    end_date,
    car,
    total,
  }: IUpdateRentalDTO): Promise<void> {
    const findIndex = this.rentals.findIndex((rental) => rental.id === id);

    Object.assign(this.rentals[findIndex], {
      start_date,
      user_id,
      expected_return_date,
      car_id,
      end_date,
      car,
      total,
      updated_at: new Date(),
    });
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === user_id);
  }
}

export default RentalsRepositoryInMemory;
