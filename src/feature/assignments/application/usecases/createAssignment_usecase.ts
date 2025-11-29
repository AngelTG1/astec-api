import { AssignmentRepository } from "../../domain/assignment_repository";
import { Assignment } from "../../domain/entity/assignment";

export class CreateAssignmentUseCase {
  constructor(private readonly repo: AssignmentRepository) {}

  async execute(assignment: Assignment): Promise<Assignment> {
    return await this.repo.create(assignment);
  }
}
