import { AssignmentRepository } from "../../domain/assignment_repository";
import { Assignment } from "../../domain/entity/assignment";

export class GetAllAssignmentsUseCase {
  constructor(private readonly repo: AssignmentRepository) {}

  async execute(): Promise<Assignment[]> {
    return await this.repo.findAll();
  }
}
