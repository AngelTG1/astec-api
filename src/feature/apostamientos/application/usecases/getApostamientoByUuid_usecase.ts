import { ApostamientoRepository } from "../../domain/apostamiento_repository";
import { Apostamiento } from "../../domain/entity/apostamiento";

export class GetApostamientoByUuidUseCase {
  constructor(private readonly repo: ApostamientoRepository) {}

  async execute(uuid: string): Promise<Apostamiento | null> {
    return await this.repo.findByUUID(uuid);
  }
}
