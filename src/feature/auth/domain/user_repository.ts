import { User } from "./entity/user";

export interface UserRepository {
  create(user: User): Promise<User>;
  findByCorreo(correo: string): Promise<User | null>;
}
