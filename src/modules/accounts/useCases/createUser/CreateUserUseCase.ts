import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import IUserRepository from "../../repositories/interfaces/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userEmailAreadyExists = await this.userRepository.findByEmail(email);

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export default CreateUserUseCase;
