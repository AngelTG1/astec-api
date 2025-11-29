import { ClientRepository } from "../../domain/client_repository";
import { Client } from "../../domain/entity/client";

export class GetClientByUuidUseCase {
  constructor(private readonly clientRepo: ClientRepository) {}

  async execute(uuid: string): Promise<Client | null> {
    return await this.clientRepo.findByUUID(uuid);
  }
}
