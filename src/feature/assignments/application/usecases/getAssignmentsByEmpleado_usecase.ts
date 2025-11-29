import { AssignmentRepository } from "../../domain/assignment_repository";
import { Assignment } from "../../domain/entity/assignment";

export class GetAssignmentsByEmpleadoUseCase {
  constructor(private readonly repo: AssignmentRepository) {}

  async execute(empleadoUuid: string): Promise<Assignment[]> {
    return await this.repo.findByEmpleado(empleadoUuid);
  }
}
