import { getRepository, Repository } from "typeorm";

import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import IUsersRepository from "@modules/accounts/repositories/interfaces/IUsersRepository";
import User from "@modules/accounts/typeorm/entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    id,
    name,
    email,
    driver_license,
    password,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      email,
      driver_license,
      password,
      avatar,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string) {
    const user = await this.repository.findOne(id);

    return user;
  }
}

export default UsersRepository;
