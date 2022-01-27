"use strict";

var _UserRepositoryInMemory = require("../../repositories/in-memory/UserRepositoryInMemory");

var _UserTokensRepositoryInMemory = require("../../repositories/in-memory/UserTokensRepositoryInMemory");

var _MailProviderInMemory = require("../../../../shared/container/provider/MailProvider/in-memory/MailProviderInMemory");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

var _AppError = require("../../../../shared/error/AppError");

var _DayjsDateProvider = require("../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let userTokensRepositoryInMemory;
let dayJsDateProvider;
let mailProvider;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UserRepositoryInMemory.UserRepositoryInMemory();
    userTokensRepositoryInMemory = new _UserTokensRepositoryInMemory.UserTokensRepositoryInMemory();
    dayJsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dayJsDateProvider, mailProvider);
  });
  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "515272",
      email: "edi@daj.nf",
      name: "Cory Rodgers",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("edi@daj.nf");
    expect(sendMail).toHaveBeenCalled();
  });
  it("Should not be able to send an email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("hu@bewtoowe.je")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  });
  it("Should be able toh create an users token", async () => {
    const generateTokenEmail = jest.spyOn(userTokensRepositoryInMemory, "create");
    usersRepositoryInMemory.create({
      driver_license: "183824",
      email: "doclih@hin.co",
      name: "Carlos Castro",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("doclih@hin.co");
    expect(generateTokenEmail).toBeCalled();
  });
});