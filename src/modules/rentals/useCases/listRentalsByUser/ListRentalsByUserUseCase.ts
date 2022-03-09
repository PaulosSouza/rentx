import { inject, injectable } from "tsyringe";

import IRentalsRepository from "@modules/rentals/repositories/interfaces/IRentalRepository";
import Rental from "@modules/rentals/typeorm/entities/Rental";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUserId(user_id);

    return rentalsByUser;
  }
}

export default ListRentalsByUserUseCase;
