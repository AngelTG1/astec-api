import { Apostamiento } from "./entity/apostamiento";

export interface ApostamientoRepository {
  create(apostamiento: Apostamiento): Promise<Apostamiento>;
  findByUUID(uuid: string): Promise<Apostamiento | null>;
  findByClient(clientUuid: string): Promise<Apostamiento[]>;
  findAll(): Promise<Apostamiento[]>;
}
