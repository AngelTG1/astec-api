import { Assignment } from "./entity/assignment";

export interface AssignmentRepository {
  create(assignment: Assignment): Promise<Assignment>;
  findAll(): Promise<Assignment[]>;
  findByUUID(uuid: string): Promise<Assignment | null>;
  findByApostamiento(apostamientoUuid: string): Promise<Assignment[]>;
  findByEmpleado(empleadoUuid: string): Promise<Assignment[]>;

}
