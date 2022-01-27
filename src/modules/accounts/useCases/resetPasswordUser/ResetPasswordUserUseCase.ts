import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokenRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("UserRepository")
    private userRespository: IUserRepository
  ) {}
  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token invalid");
    }

    if (
      this.dayjsDateProvider.compareIfBefore(
        userToken.expire_date,
        this.dayjsDateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired");
    }

    const user = await this.userRespository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.userRespository.create(user);

    await this.userTokenRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
