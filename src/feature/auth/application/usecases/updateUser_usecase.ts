import { User } from "../../domain/entity/user";
import { UserRepository } from "../../domain/user_repository";
import { BcryptService } from "../../infraestructure/services/bcryptService";

export class UpdateUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(uuid: string, data: Partial<User>): Promise<User> {
    if (data.correo) {
      const existing = await this.repo.findByCorreo(data.correo);
      if (existing && existing.uuid !== uuid) {
        throw new Error("El correo ya está en uso");
      }
    }

    if (data.password) {
      data.password = await BcryptService.hash(data.password);
    }

    return await this.repo.updateByUuid(uuid, data);
  }
}
