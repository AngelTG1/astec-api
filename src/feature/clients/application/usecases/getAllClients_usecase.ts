import { ClientRepository } from "../../domain/client_repository";
import { Client } from "../../domain/entity/client";

export class GetAllClientsUseCase {
  constructor(private readonly clientRepo: ClientRepository) {}

  async execute(): Promise<Client[]> {
    return await this.clientRepo.findAll();
  }
}
