import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
import IUpdateRentalDTO from "@modules/rentals/dtos/IUpdateRentalDTO";
import Rental from "@modules/rentals/typeorm/entities/Rental";

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  update(data: IUpdateRentalDTO): Promise<void>;
  findByUserId(user_id: string): Promise<Rental[]>;
}

export default IRentalsRepository;
