"use strict";

var _UserTokensRepositoryInMemory = require("../../repositories/in-memory/UserTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("../../../../shared/error/AppError");

var _UserRepositoryInMemory = require("../../repositories/in-memory/UserRepositoryInMemory");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let userTokensRepositoryInMemory;
let createUserUseCase;
let dayJsDateProvider;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UserRepositoryInMemory.UserRepositoryInMemory();
    userTokensRepositoryInMemory = new _UserTokensRepositoryInMemory.UserTokensRepositoryInMemory();
    dayJsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dayJsDateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    const user = {
      driver_license: "78915346",
      email: "user@test.com.br",
      password: "123456",
      name: "User Test"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    /* console.log(result); */

    expect(result).toHaveProperty("token");
  });
  it("should not be able to authenticate an none existent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@email.com",
      password: "1234"
    })).rejects.toEqual(new _AppError.AppError("Email or Password incorrect!"));
  });
  it("should not be able to authenticate with incorrect password", async () => {
    const user = {
      driver_license: "111222333",
      email: "user@teste.com.br",
      password: "1234",
      name: "User Test Error"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "incorrectPassoword"
    })).rejects.toEqual(new _AppError.AppError("Email or Password incorrect!"));
  });
});