import { Activity } from "./entity/activity";
import { Employee } from "../../employee/domain/entity/employee";

export interface AttendanceWithClient {
  activityUuid: string;
  clientUuid: string;
  clientRazonSocial: string;
  clientRfc: string;
  empleadoUuid: string;
  empleadoNombreCompleto: string;
  fecha: string;
  tipoTurno: Activity["tipoTurno"];
  horaEntrada: string | null;
  horaSalida: string | null;
  terminaSiguienteDia: boolean;
  pago: number;
  nota: string | null;
}

export interface ActivityRepository {
  create(activity: Activity): Promise<Activity>;
  findAll(): Promise<Activity[]>;
  findByUUID(uuid: string): Promise<Activity | null>;
  findByClient(clientUuid: string, startDate?: string, endDate?: string): Promise<Activity[]>;
  findByEmpleado(empleadoUuid: string, startDate?: string, endDate?: string): Promise<Activity[]>;
  findEmployeesByClient(clientUuid: string): Promise<Employee[]>;
  findClientsWithAttendance(startDate?: string, endDate?: string): Promise<AttendanceWithClient[]>;
}
