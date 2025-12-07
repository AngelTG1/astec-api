import { ActivityRepository } from "../../domain/activity_repository";
import { Activity } from "../../domain/entity/activity";

export class GetActivitiesByClientUseCase {
  constructor(private readonly repo: ActivityRepository) {}

  async execute(clientUuid: string, startDate?: string, endDate?: string): Promise<Activity[]> {
    return await this.repo.findByClient(clientUuid, startDate, endDate);
  }
}
