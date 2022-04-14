import ICreateUserTokenDTO from "@modules/accounts/dtos/ICreateUserTokenDTO";
import UserTokens from "@modules/accounts/typeorm/entities/UserTokens";

import IUsersTokensRepository from "../interfaces/IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refreshToken: string
  ): Promise<UserTokens> {
    return this.usersTokens.find(
      (userToken) =>
        userToken.id === user_id && userToken.refresh_token === refreshToken
    );
  }

  async deleteById(id: string): Promise<void> {
    const userTokenFound = this.usersTokens.find(
      (userToken) => userToken.id === id
    );

    this.usersTokens.splice(this.usersTokens.indexOf(userTokenFound));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
  }
}

export default UsersTokensRepositoryInMemory;
