import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { MailProviderInMemory } from "@shared/container/provider/MailProvider/in-memory/MailProviderInMemory";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { AppError } from "@shared/error/AppError";
import { DayjsDateProvider } from "@shared/container/provider/DateProvider/implementations/DayjsDateProvider";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dayJsDateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "515272",
      email: "edi@daj.nf",
      name: "Cory Rodgers",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("edi@daj.nf");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("hu@bewtoowe.je")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("Should be able toh create an users token", async () => {
    const generateTokenEmail = jest.spyOn(
      userTokensRepositoryInMemory,
      "create"
    );

    usersRepositoryInMemory.create({
      driver_license: "183824",
      email: "doclih@hin.co",
      name: "Carlos Castro",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("doclih@hin.co");

    expect(generateTokenEmail).toBeCalled();
  });
});
