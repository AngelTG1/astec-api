import { UserRepository } from "../../domain/user_repository";
import { User } from "../../domain/entity/user";
import { BcryptService } from "../../infraestructure/services/bcryptService";

export class RegisterUserUseCase {

  constructor(private readonly repo: UserRepository) {}

  async execute(user: User): Promise<User> {

    const exists = await this.repo.findByCorreo(user.correo);
    if (exists) throw new Error("El correo ya está registrado");

    user.password = await BcryptService.hash(user.password);

    return await this.repo.create(user);
  }
}
