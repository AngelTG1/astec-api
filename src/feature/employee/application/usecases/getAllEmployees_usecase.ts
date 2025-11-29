import { EmployeeRepository } from "../../domain/employee_repository";
import { Employee } from "../../domain/entity/employee";

export class GetAllEmployeesUseCase {
  constructor(private readonly employeeRepo: EmployeeRepository) {}

  async execute(): Promise<Employee[]> {
    // Obtener todos ES DIFERENTE a tu función findAllByClient
    const employees = await this.employeeRepo.findAll();
    return employees;
  }
}
