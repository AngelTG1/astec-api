import { Assignment } from "../../domain/entity/assignment";
import { AssignmentRepository } from "../../domain/assignment_repository";

export class UpdateAssignmentUseCase {
  constructor(private readonly repo: AssignmentRepository) {}

  async execute(uuid: string, data: Partial<Assignment>): Promise<Assignment> {
    return await this.repo.updateByUuid(uuid, data);
  }
}
