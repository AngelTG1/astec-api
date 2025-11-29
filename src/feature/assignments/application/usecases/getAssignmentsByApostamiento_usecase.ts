import { AssignmentRepository } from "../../domain/assignment_repository";
import { Assignment } from "../../domain/entity/assignment";

export class GetAssignmentsByApostamientoUseCase {
  constructor(private readonly repo: AssignmentRepository) {}

  async execute(apostamientoUuid: string): Promise<Assignment[]> {
    return await this.repo.findByApostamiento(apostamientoUuid);
  }
}
