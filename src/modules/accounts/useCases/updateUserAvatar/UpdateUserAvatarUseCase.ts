import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IStorageProvider } from "@shared/container/provider/StorageProvaider/IStorageProvaider";

interface IRequest {
  user_id: string;
  avatar_File: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("StorageProvider")
    private storageProvaider: IStorageProvider
  ) {}

  async execute({ user_id, avatar_File }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvaider.delete(user.avatar, "avatar");
    }

    await this.storageProvaider.save(avatar_File, "avatar");

    user.avatar = avatar_File;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
