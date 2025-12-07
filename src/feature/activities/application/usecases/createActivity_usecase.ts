import { ActivityRepository } from "../../domain/activity_repository";
import { Activity } from "../../domain/entity/activity";

export class CreateActivityUseCase {
  constructor(private readonly repo: ActivityRepository) {}

  async execute(activity: Activity): Promise<Activity> {
    return await this.repo.create(activity);
  }
}
