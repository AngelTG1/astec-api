import { Apostamiento } from "../../domain/entity/apostamiento";
import { ApostamientoRepository } from "../../domain/apostamiento_repository";

export class UpdateApostamientoUseCase {
  constructor(private readonly repo: ApostamientoRepository) {}

  async execute(uuid: string, data: Partial<Apostamiento>): Promise<Apostamiento> {
    return await this.repo.updateByUuid(uuid, data);
  }
}
