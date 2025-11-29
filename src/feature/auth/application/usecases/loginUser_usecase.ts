import { UserRepository } from "../../domain/user_repository";
import { BcryptService } from "../../infraestructure/services/bcryptService";
import { JwtService } from "../../infraestructure/services/jwtService";

export class LoginUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(correo: string, password: string) {
    const user = await this.repo.findByCorreo(correo);
    if (!user) throw new Error("Credenciales inválidas");

    const isMatch = await BcryptService.compare(password, user.password);
    if (!isMatch) throw new Error("Credenciales inválidas");

    const token = JwtService.sign({
      uuid: user.uuid,
      rol: user.rol,
      correo: user.correo
    });

    return { user, token };
  }
}
