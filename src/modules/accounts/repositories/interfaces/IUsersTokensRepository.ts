import ICreateUserTokenDTO from "@modules/accounts/dtos/ICreateUserTokenDTO";
import UserTokens from "@modules/accounts/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refreshToken: string
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
}

export default IUsersTokensRepository;
