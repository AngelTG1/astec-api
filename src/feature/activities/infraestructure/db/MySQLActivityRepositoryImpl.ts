import pool from "../../../../core/config/database_conexion";
import { ActivityRepository, AttendanceWithClient } from "../../domain/activity_repository";
import { Activity } from "../../domain/entity/activity";
import { Employee } from "../../../employee/domain/entity/employee";

export class MySQLActivityRepositoryImpl implements ActivityRepository {

  async create(activity: Activity): Promise<Activity> {

    // Validar que la fecha no sea pasada
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let activityDate = parseDateOnly(activity.fecha);
    if (!activityDate) {
      activityDate = new Date(activity.fecha);
      activityDate.setHours(0, 0, 0, 0);
    }

    if (activityDate < today) {
      throw new Error("No se pueden registrar actividades con fechas pasadas");
    }


    // Validar cliente
    const [clientRows]: any = await pool.query(
      "SELECT uuid FROM clients WHERE uuid = ?",
      [activity.clientUuid]
    );

    if (clientRows.length === 0) {
      throw new Error("El cliente no existe. Verifique clientUuid.");
    }

    // Validar empleado
    const [employeeRows]: any = await pool.query(
      "SELECT uuid FROM employees WHERE uuid = ?",
      [activity.empleadoUuid]
    );

    if (employeeRows.length === 0) {
      throw new Error("El empleado no existe. Verifique empleadoUuid.");
    }

    // Validar relación empleado-cliente por asignación
    const [assignmentRows]: any = await pool.query(
      `SELECT a.uuid
       FROM assignments a
       INNER JOIN apostamientos ap ON ap.uuid = a.apostamientoUuid
       WHERE a.empleadoUuid = ? AND ap.clientUuid = ?
       LIMIT 1`,
      [activity.empleadoUuid, activity.clientUuid]
    );

    if (assignmentRows.length === 0) {
      throw new Error("El empleado no está asignado a este cliente.");
    }

    // Crear actividad
    const [result]: any = await pool.query(
      "INSERT INTO activities SET ?",
      {
        uuid: activity.uuid,
        clientUuid: activity.clientUuid,
        empleadoUuid: activity.empleadoUuid,
        fecha: activity.fecha,
        tipoTurno: activity.tipoTurno,
        horaEntrada: activity.horaEntrada ?? null,
        horaSalida: activity.horaSalida ?? null,
        terminaSiguienteDia: activity.terminaSiguienteDia ?? false,
        pago: activity.pago,
        nota: activity.nota ?? null
      }
    );

    return {
      id: result.insertId,
      ...activity
    };
  }

  async findAll(): Promise<Activity[]> {
    const [rows]: any = await pool.query(
      "SELECT * FROM activities ORDER BY fecha DESC, horaEntrada ASC"
    );
    return rows as Activity[];
  }

  async findByUUID(uuid: string): Promise<Activity | null> {
    const [rows]: any = await pool.query(
      "SELECT * FROM activities WHERE uuid = ?",
      [uuid]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async findByClient(clientUuid: string, startDate?: string, endDate?: string): Promise<Activity[]> {
    const params: any[] = [clientUuid];
    let query = "SELECT * FROM activities WHERE clientUuid = ?";

    if (startDate) {
      query += " AND fecha >= ?";
      params.push(startDate);
    }

    if (endDate) {
      query += " AND fecha <= ?";
      params.push(endDate);
    }

    query += " ORDER BY fecha ASC, horaEntrada ASC";

    const [rows]: any = await pool.query(query, params);
    return rows as Activity[];
  }

  async findByEmpleado(empleadoUuid: string, startDate?: string, endDate?: string): Promise<Activity[]> {
    const params: any[] = [empleadoUuid];
    let query = "SELECT * FROM activities WHERE empleadoUuid = ?";

    if (startDate) {
      query += " AND fecha >= ?";
      params.push(startDate);
    }

    if (endDate) {
      query += " AND fecha <= ?";
      params.push(endDate);
    }

    query += " ORDER BY fecha ASC, horaEntrada ASC";

    const [rows]: any = await pool.query(query, params);
    return rows as Activity[];
  }

  async findEmployeesByClient(clientUuid: string): Promise<Employee[]> {
    const [rows]: any = await pool.query(
      `SELECT DISTINCT e.*
       FROM employees e
       INNER JOIN assignments a ON a.empleadoUuid = e.uuid
       INNER JOIN apostamientos ap ON ap.uuid = a.apostamientoUuid
       WHERE ap.clientUuid = ?`,
      [clientUuid]
    );
    return rows as Employee[];
  }

  async findClientsWithAttendance(startDate?: string, endDate?: string): Promise<AttendanceWithClient[]> {
    const params: any[] = [];
    const filters: string[] = [];

    if (startDate) {
      filters.push("a.fecha >= ?");
      params.push(startDate);
    }

    if (endDate) {
      filters.push("a.fecha <= ?");
      params.push(endDate);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

    const [rows]: any = await pool.query(
      `SELECT
         a.uuid AS activityUuid,
         a.clientUuid,
         c.razonSocial AS clientRazonSocial,
         c.rfc AS clientRfc,
         a.empleadoUuid,
         CONCAT(e.nombre, ' ', e.apellidoPaterno, ' ', e.apellidoMaterno) AS empleadoNombreCompleto,
         a.fecha,
         a.tipoTurno,
         a.horaEntrada,
         a.horaSalida,
         a.terminaSiguienteDia,
         a.pago,
         a.nota
       FROM activities a
       INNER JOIN clients c ON c.uuid = a.clientUuid
       INNER JOIN employees e ON e.uuid = a.empleadoUuid
       ${whereClause}
       ORDER BY a.fecha DESC, a.horaEntrada ASC`,
      params
    );

    return rows as AttendanceWithClient[];
  }
}

function parseDateOnly(value: string): Date | null {
  const parts = value.split("-");
  if (parts.length === 3) {
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    if (
      Number.isInteger(year) &&
      Number.isInteger(month) &&
      Number.isInteger(day)
    ) {
      const local = new Date(year, month - 1, day);
      local.setHours(0, 0, 0, 0);
      return local;
    }
  }

  return null;
}
