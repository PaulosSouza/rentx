import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import UsersTokensRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import DayjsDateProvider from "@shared/container/provider/DateProvider/implementations/DayjsDateProvider";
import MailProviderInMemory from "@shared/container/provider/MailProvider/in-memory/MailProviderInMemory";
import AppError from "@shared/errors/AppError";

import SendForgotPasswordMailUseCase from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "546441",
      email: "hupevof@zodiw.md",
      name: "Lester Stevens",
      password: "412314",
    });

    await sendForgotPasswordMailUseCase.execute("hupevof@zodiw.md");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("jazebko@ufkapwom.hm")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be abel to create an users token", async () => {
    const generatedTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "96949",
      email: "ufiupni@elhufe.er",
      name: "Luis Silva",
      password: "412314",
    });

    await sendForgotPasswordMailUseCase.execute("ufiupni@elhufe.er");

    expect(generatedTokenMail).toBeCalled();
  });
});
