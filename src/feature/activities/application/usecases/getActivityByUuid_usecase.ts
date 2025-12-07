import { ActivityRepository } from "../../domain/activity_repository";
import { Activity } from "../../domain/entity/activity";

export class GetActivityByUuidUseCase {
  constructor(private readonly repo: ActivityRepository) {}

  async execute(uuid: string): Promise<Activity | null> {
    return await this.repo.findByUUID(uuid);
  }
}
