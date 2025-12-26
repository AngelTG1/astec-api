import { User } from "./entity/user";

export interface UserRepository {
  create(user: User): Promise<User>;
  findByCorreo(correo: string): Promise<User | null>;
  findByUuid(uuid: string): Promise<User | null>;
  updateByUuid(uuid: string, data: Partial<User>): Promise<User>;
  findAll(): Promise<User[]>;
}
