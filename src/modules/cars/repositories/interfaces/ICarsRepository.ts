import ICreateCarsDTO from "@modules/cars/dtos/ICreateCarsDTO";
import Car from "@modules/cars/typeorm/entities/Car";

export default interface ICarsRepository {
  create(data: ICreateCarsDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
}
