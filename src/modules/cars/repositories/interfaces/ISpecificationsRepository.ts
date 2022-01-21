import ICreateSpecificationDTO from "@modules/cars/dtos/ICreateSpecificationDTO";
import Specification from "@modules/cars/typeorm/entities/Specification";

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification | undefined>;
}

export default ISpecificationsRepository;
