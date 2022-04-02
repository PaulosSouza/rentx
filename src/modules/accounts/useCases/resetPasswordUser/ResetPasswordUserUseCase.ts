import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/accounts/repositories/interfaces/IUsersRepository";
import IUsersTokensRepository from "@modules/accounts/repositories/interfaces/IUsersTokensRepository";
import IDateProvider from "@shared/container/provider/DateProvider/interfaces/IDateProvider";
import AppError from "@shared/errors/AppError";

interface IRequest {
  refreshToken: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokenRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ refreshToken, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(
      refreshToken
    );

    if (!userToken) {
      throw new AppError("Token invalid!");
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Invalid date!");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokenRepository.deleteById(userToken.id);
  }
}

export default ResetPasswordUserUseCase;
