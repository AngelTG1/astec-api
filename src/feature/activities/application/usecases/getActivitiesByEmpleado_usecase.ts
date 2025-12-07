import { ActivityRepository } from "../../domain/activity_repository";
import { Activity } from "../../domain/entity/activity";

export class GetActivitiesByEmpleadoUseCase {
  constructor(private readonly repo: ActivityRepository) {}

  async execute(empleadoUuid: string, startDate?: string, endDate?: string): Promise<Activity[]> {
    return await this.repo.findByEmpleado(empleadoUuid, startDate, endDate);
  }
}
