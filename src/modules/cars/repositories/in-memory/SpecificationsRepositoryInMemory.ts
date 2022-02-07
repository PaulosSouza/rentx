import ICreateSpecificationDTO from "@modules/cars/dtos/ICreateSpecificationDTO";
import Specification from "@modules/cars/typeorm/entities/Specification";

import ISpecificationsRepository from "../interfaces/ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return specifications;
  }
}

export default SpecificationsRepositoryInMemory;
