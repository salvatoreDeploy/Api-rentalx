import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";

import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { resolve } from "path";

import { v4 as uuidV4 } from "uuid";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/provider/MailProvider/IMailProvider";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("MailProvider")
    private etherealMailProvider: IMailProvider
  ) {}
  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    const templateHtml = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("User does not exists!");
    }

    const token = uuidV4();

    const expire_date = this.dayjsDateProvider.addHours(3);

    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expire_date,
    });

    const variables = {
      name: user.name,
      //link: `http://localhost:3333/password/reset?token=${token}`,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.etherealMailProvider.sendMail(
      email,
      "Recuperação de Senha",
      variables,
      templateHtml
    );
  }
}

export { SendForgotPasswordMailUseCase };
