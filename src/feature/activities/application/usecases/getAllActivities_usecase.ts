import { ActivityRepository } from "../../domain/activity_repository";
import { Activity } from "../../domain/entity/activity";

export class GetAllActivitiesUseCase {
  constructor(private readonly repo: ActivityRepository) {}

  async execute(): Promise<Activity[]> {
    return await this.repo.findAll();
  }
}
