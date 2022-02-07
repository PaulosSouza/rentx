import ICreateSpecificationDTO from "@modules/cars/dtos/ICreateSpecificationDTO";
import Specification from "@modules/cars/typeorm/entities/Specification";

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification | undefined>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export default ISpecificationsRepository;
