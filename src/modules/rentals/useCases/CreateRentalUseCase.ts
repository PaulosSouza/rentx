import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import IDateProvider from "@shared/container/provider/DateProvider/interfaces/IDateProvider";
import AppError from "@shared/errors/AppError";

import IRentalsRepository from "../repositories/interfaces/IRentalRepository";
import Rental from "../typeorm/entities/Rental";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minCompareHour = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for this user!");
    }

    const dateNow = this.dateProvider.dateNow();

    const comparedDate = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (comparedDate < minCompareHour) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export default CreateRentalUseCase;
