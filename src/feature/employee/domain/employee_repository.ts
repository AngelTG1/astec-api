import { Employee } from "./entity/employee";

export interface EmployeeRepository {
  create(employee: Employee): Promise<Employee>;
  findByUUID(uuid: string): Promise<Employee | null>;
  findById(id: number): Promise<Employee | null>;
  findAllByClient(clientId: number): Promise<Employee[]>;
  findAll(): Promise<Employee[]>;
}
