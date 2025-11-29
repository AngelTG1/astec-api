import { EmployeeRepository } from "../../domain/employee_repository";
import { Employee } from "../../domain/entity/employee";

export class CreateEmployeeUseCase {
  constructor(private readonly employeeRepo: EmployeeRepository) {}

  async execute(employee: Employee): Promise<Employee> {
    return await this.employeeRepo.create(employee);
  }
}
