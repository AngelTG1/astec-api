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

    async updateByUuid(uuid: string, data: Partial<Assignment>): Promise<Assignment> {
        const current = await this.findByUUID(uuid);
        if (!current) {
            throw new Error("Asignación no encontrada");
        }

        const updateData: any = {};

        if (data.apostamientoUuid !== undefined) {
            const [apostamientoRows]: any = await pool.query(
                "SELECT uuid FROM apostamientos WHERE uuid = ?",
                [data.apostamientoUuid]
            );

            if (apostamientoRows.length === 0) {
                throw new Error("El apostamiento no existe. Verifique apostamientoUuid.");
            }

            updateData.apostamientoUuid = data.apostamientoUuid;
        }

        if (data.empleadoUuid !== undefined) {
            const [empleadoRows]: any = await pool.query(
                "SELECT uuid FROM employees WHERE uuid = ?",
                [data.empleadoUuid]
            );

            if (empleadoRows.length === 0) {
                throw new Error("El empleado no existe. Verifique empleadoUuid.");
            }

            updateData.empleadoUuid = data.empleadoUuid;
        }

        if (data.fechaInicioServicio !== undefined) updateData.fechaInicioServicio = data.fechaInicioServicio;
        if (data.tipoServicioAsignado !== undefined) updateData.tipoServicioAsignado = data.tipoServicioAsignado;
        if (data.precioServicio !== undefined) updateData.precioServicio = data.precioServicio;
        if (data.empresaSede !== undefined) updateData.empresaSede = data.empresaSede;
        if (data.observaciones !== undefined) updateData.observaciones = data.observaciones ?? null;

        if (Object.keys(updateData).length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        await pool.query(
            "UPDATE assignments SET ? WHERE uuid = ?",
            [updateData, uuid]
        );

        if (data.empleadoUuid !== undefined && data.empleadoUuid !== current.empleadoUuid) {
            await pool.query(
                "UPDATE employees SET asignacionUuid = NULL, statusAsignacion = 'no_asignado' WHERE uuid = ?",
                [current.empleadoUuid]
            );

            await pool.query(
                "UPDATE employees SET asignacionUuid = ?, statusAsignacion = 'asignado' WHERE uuid = ?",
                [uuid, data.empleadoUuid]
            );
        }

        const updated = await this.findByUUID(uuid);
        if (!updated) {
            throw new Error("Asignación no encontrada");
        }

        return updated;
    }
}
