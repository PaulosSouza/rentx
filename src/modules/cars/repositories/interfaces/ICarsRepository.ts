import ICreateCarsDTO from "@modules/cars/dtos/ICreateCarsDTO";
import Car from "@modules/cars/typeorm/entities/Car";

export default interface ICarsRepository {
  create(data: ICreateCarsDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}
