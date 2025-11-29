import pool from "../../../../core/config/database_conexion";
import { AssignmentRepository } from "../../domain/assignment_repository";
import { Assignment } from "../../domain/entity/assignment";

export class MySQLAssignmentRepositoryImpl implements AssignmentRepository {

    async create(assignment: Assignment): Promise<Assignment> {

        // 1️⃣ Validar si existe el apostamiento
        const [apostamientoRows]: any = await pool.query(
            "SELECT uuid FROM apostamientos WHERE uuid = ?",
            [assignment.apostamientoUuid]
        );

        if (apostamientoRows.length === 0) {
            throw new Error("El apostamiento no existe. Verifique apostamientoUuid.");
        }

        // 2️⃣ Validar si existe el empleado
        const [empleadoRows]: any = await pool.query(
            "SELECT uuid FROM employees WHERE uuid = ?",
            [assignment.empleadoUuid]
        );

        if (empleadoRows.length === 0) {
            throw new Error("El empleado no existe. Verifique empleadoUuid.");
        }

        // 3️⃣ Crear la asignación
        const [result]: any = await pool.query(
            "INSERT INTO assignments SET ?", {
                uuid: assignment.uuid,
                apostamientoUuid: assignment.apostamientoUuid,
                empleadoUuid: assignment.empleadoUuid,

                fechaInicioServicio: assignment.fechaInicioServicio,
                tipoServicioAsignado: assignment.tipoServicioAsignado,
                precioServicio: assignment.precioServicio,
                empresaSede: assignment.empresaSede,
                observaciones: assignment.observaciones ?? null
            }
        );

        // 4️⃣ Actualizar al empleado con la asignación
        await pool.query(
            "UPDATE employees SET asignacionUuid = ?, statusAsignacion = 'asignado' WHERE uuid = ?",
            [assignment.uuid, assignment.empleadoUuid]
        );

        return {
            id: result.insertId,
            ...assignment
        };
    }

    async findAll(): Promise<Assignment[]> {
        const [rows]: any = await pool.query("SELECT * FROM assignments");
        return rows as Assignment[];
    }

    async findByUUID(uuid: string): Promise<Assignment | null> {
        const [rows]: any = await pool.query(
            "SELECT * FROM assignments WHERE uuid = ?",
            [uuid]
        );
        return rows.length > 0 ? rows[0] : null;
    }

    async findByApostamiento(apostamientoUuid: string): Promise<Assignment[]> {
        const [rows]: any = await pool.query(
            "SELECT * FROM assignments WHERE apostamientoUuid = ?",
            [apostamientoUuid]
        );
        return rows as Assignment[];
    }

    async findByEmpleado(empleadoUuid: string): Promise<Assignment[]> {
        const [rows]: any = await pool.query(
            "SELECT * FROM assignments WHERE empleadoUuid = ?",
            [empleadoUuid]
        );
        return rows as Assignment[];
    }
}
