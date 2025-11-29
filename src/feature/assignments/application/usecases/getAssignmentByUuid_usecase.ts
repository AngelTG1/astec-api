import { AssignmentRepository } from "../../domain/assignment_repository";
import { Assignment } from "../../domain/entity/assignment";

export class GetAssignmentByUuidUseCase {
  constructor(private readonly repo: AssignmentRepository) {}

  async execute(uuid: string): Promise<Assignment | null> {
    return await this.repo.findByUUID(uuid);
  }
}
