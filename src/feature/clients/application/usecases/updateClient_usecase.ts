import { Client } from "../../domain/entity/client";
import { ClientRepository } from "../../domain/client_repository";

export class UpdateClientUseCase {
  constructor(private readonly clientRepo: ClientRepository) {}

  async execute(uuid: string, data: Partial<Client>): Promise<Client> {
    if (data.rfc) {
      const existing = await this.clientRepo.findByRFC(data.rfc);
      if (existing && existing.uuid !== uuid) {
        throw new Error("El RFC ya está en uso");
      }
    }

    return await this.clientRepo.updateByUuid(uuid, data);
  }
}
