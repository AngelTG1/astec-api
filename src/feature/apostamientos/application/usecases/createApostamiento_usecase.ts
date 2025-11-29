import { ApostamientoRepository } from "../../domain/apostamiento_repository";
import { Apostamiento } from "../../domain/entity/apostamiento";

export class CreateApostamientoUseCase {
  constructor(private readonly repo: ApostamientoRepository) {}

  async execute(apostamiento: Apostamiento): Promise<Apostamiento> {
    return await this.repo.create(apostamiento);
  }
}
