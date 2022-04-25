import { inject, injectable } from "tsyringe";

import IUserResponseDTO from "@modules/accounts/dtos/responses/IUserResponseDTO";
import UserMap from "@modules/accounts/mappers/UserMap";
import IUsersRepository from "@modules/accounts/repositories/interfaces/IUsersRepository";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export default ProfileUserUseCase;
