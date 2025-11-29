import { EmployeeRepository } from "../../domain/employee_repository";
import { Employee } from "../../domain/entity/employee";

export class GetEmployeeByUuidUseCase {
  constructor(private readonly employeeRepo: EmployeeRepository) {}

  async execute(uuid: string): Promise<Employee | null> {
    return await this.employeeRepo.findByUUID(uuid);
  }
}
