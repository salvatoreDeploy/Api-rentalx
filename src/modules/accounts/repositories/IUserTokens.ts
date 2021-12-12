import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUserTokensRepository {
  create({
    user_id,
    expire_date,
    refresh_token,
  }: ICreateUserTokensDTO): Promise<UserTokens>;
}

export { IUserTokensRepository };
