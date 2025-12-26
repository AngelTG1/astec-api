import { UserRepository } from "../../domain/user_repository";
import { User } from "../../domain/entity/user";

export class GetAllUsersUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.repo.findAll();
  }
}
