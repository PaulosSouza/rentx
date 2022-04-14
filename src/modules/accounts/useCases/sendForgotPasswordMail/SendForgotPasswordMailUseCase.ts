import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import IUsersRepository from "@modules/accounts/repositories/interfaces/IUsersRepository";
import IUsersTokensRepository from "@modules/accounts/repositories/interfaces/IUsersTokensRepository";
import IDateProvider from "@shared/container/provider/DateProvider/interfaces/IDateProvider";
import IMailProvider from "@shared/container/provider/MailProvider/interfaces/IMailProvider";
import AppError from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    const token = uuidV4();

    const expiresDate = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: expiresDate,
    });

    const forgotPasswordTemplate = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      forgotPasswordTemplate
    );
  }
}

export default SendForgotPasswordMailUseCase;
