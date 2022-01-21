import { getRepository, Repository } from "typeorm";

import ICreateSpecificationDTO from "@modules/cars/dtos/ICreateSpecificationDTO";
import ISpecificationsRepository from "@modules/cars/repositories/interfaces/ISpecificationsRepository";
import Specification from "@modules/cars/typeorm/entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}

export default SpecificationsRepository;
