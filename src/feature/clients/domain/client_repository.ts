import { Client } from "./entity/client";

export interface ClientRepository {
  create(client: Client): Promise<Client>; 
  findByRFC(rfc: string): Promise<Client | null>;
  findAll(): Promise<Client[]>;
  findByUUID(uuid: string): Promise<Client | null>; 
}
