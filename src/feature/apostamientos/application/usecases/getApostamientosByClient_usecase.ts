import { ApostamientoRepository } from "../../domain/apostamiento_repository";
import { Apostamiento } from "../../domain/entity/apostamiento";

export class GetApostamientosByClientUseCase {
  constructor(private readonly repo: ApostamientoRepository) {}

  async execute(clientUuid: string): Promise<Apostamiento[]> {
    return await this.repo.findByClient(clientUuid);
  }
}
