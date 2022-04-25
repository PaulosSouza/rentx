import { instanceToInstance } from "class-transformer";

import IUserResponseDTO from "../dtos/responses/IUserResponseDTO";
import User from "../typeorm/entities/User";

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}

export default UserMap;
