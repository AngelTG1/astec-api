import { ActivityRepository } from "../../domain/activity_repository";
import { Employee } from "../../../employee/domain/entity/employee";

export class GetEmployeesByClientUseCase {
  constructor(private readonly repo: ActivityRepository) {}

  async execute(clientUuid: string): Promise<Employee[]> {
    return await this.repo.findEmployeesByClient(clientUuid);
  }
}
