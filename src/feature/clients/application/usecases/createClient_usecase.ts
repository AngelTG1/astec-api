import { ClientRepository } from "../../domain/client_repository";
import { Client } from "../../domain/entity/client";
import { ClientAlreadyExistsError } from "../../infraestructure/errors/ClientAlreadyExistsError";

export class CreateClientUseCase {
  constructor(private readonly clientRepo: ClientRepository) {}

  async execute(client: Client): Promise<Client> {
    const exists = await this.clientRepo.findByRFC(client.rfc);

    if (exists) {
      throw new ClientAlreadyExistsError("El cliente ya existe con este RFC");
    }

    const newClient = await this.clientRepo.create(client);
    return newClient; // 👈 IMPORTANTÍSIMO
  }
}
