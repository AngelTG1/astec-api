import { Employee } from "../../domain/entity/employee";
import { EmployeeRepository } from "../../domain/employee_repository";

export class UpdateEmployeeUseCase {
  constructor(private readonly employeeRepo: EmployeeRepository) {}

  async execute(uuid: string, data: Partial<Employee>): Promise<Employee> {
    return await this.employeeRepo.updateByUuid(uuid, data);
  }
}
