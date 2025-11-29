import { ApostamientoRepository } from "../../domain/apostamiento_repository";
import { Apostamiento } from "../../domain/entity/apostamiento";

export class GetAllApostamientosUseCase {
  constructor(private readonly repo: ApostamientoRepository) {}

  async execute(): Promise<Apostamiento[]> {
    return await this.repo.findAll();
  }
}
