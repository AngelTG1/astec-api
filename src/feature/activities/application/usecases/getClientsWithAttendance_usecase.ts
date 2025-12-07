import { ActivityRepository, AttendanceWithClient } from "../../domain/activity_repository";

export class GetClientsWithAttendanceUseCase {
  constructor(private readonly repo: ActivityRepository) {}

  async execute(startDate?: string, endDate?: string): Promise<AttendanceWithClient[]> {
    return await this.repo.findClientsWithAttendance(startDate, endDate);
  }
}
