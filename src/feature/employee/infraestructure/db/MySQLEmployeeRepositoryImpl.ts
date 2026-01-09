import pool from "../../../../core/config/database_conexion";
import { EmployeeRepository } from "../../domain/employee_repository";
import { Employee } from "../../domain/entity/employee";

export class MySQLEmployeeRepositoryImpl implements EmployeeRepository {

    async create(employee: Employee): Promise<Employee> {

        const [result]: any = await pool.query(
            "INSERT INTO employees SET ?", {
            uuid: employee.uuid,
            asignacionUuid: employee.asignacionUuid ?? null,
            statusAsignacion: employee.statusAsignacion ?? "no_asignado",

            fotografia: employee.fotografia ?? null,
            nombre: employee.nombre,
            apellidoPaterno: employee.apellidoPaterno,
            apellidoMaterno: employee.apellidoMaterno,
            fechaNacimiento: employee.fechaNacimiento,
            telefonoPersonal: employee.telefonoPersonal,
            telefonoFamiliar: employee.telefonoFamiliar ?? null,
            domicilio: employee.domicilio,
            ine: employee.ine,
            rfc: employee.rfc,
            curp: employee.curp
        }
        );

        return {
            id: result.insertId,
            ...employee
        };
    }

    async findAll(): Promise<Employee[]> {
        const [rows]: any = await pool.query("SELECT * FROM employees");
        return rows as Employee[];
    }


    async findByUUID(uuid: string): Promise<Employee | null> {
        const [rows]: any = await pool.query(
            "SELECT * FROM employees WHERE uuid = ?",
            [uuid]
        );
        return rows.length > 0 ? rows[0] : null;
    }

    async findById(id: number): Promise<Employee | null> {
        const [rows]: any = await pool.query(
            "SELECT * FROM employees WHERE id = ?",
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    }

    async findAllByClient(clientId: number): Promise<Employee[]> {
        // ⚠️ ESTA FUNCIÓN YA NO ES ÚTIL si no hay relación cliente-empleado
        // pero la dejo por si luego quieres filtrar por asignacionUuid

        const [rows]: any = await pool.query(
            "SELECT * FROM employees WHERE asignacionUuid = ?",
            [clientId]
        );

        return rows as Employee[];
    }

    async updateByUuid(uuid: string, data: Partial<Employee>): Promise<Employee> {
        const updateData: any = {};

        if (data.asignacionUuid !== undefined) updateData.asignacionUuid = data.asignacionUuid;
        if (data.statusAsignacion !== undefined) updateData.statusAsignacion = data.statusAsignacion;
        if (data.fotografia !== undefined) updateData.fotografia = data.fotografia;
        if (data.nombre !== undefined) updateData.nombre = data.nombre;
        if (data.apellidoPaterno !== undefined) updateData.apellidoPaterno = data.apellidoPaterno;
        if (data.apellidoMaterno !== undefined) updateData.apellidoMaterno = data.apellidoMaterno;
        if (data.fechaNacimiento !== undefined) updateData.fechaNacimiento = data.fechaNacimiento;
        if (data.telefonoPersonal !== undefined) updateData.telefonoPersonal = data.telefonoPersonal;
        if (data.telefonoFamiliar !== undefined) updateData.telefonoFamiliar = data.telefonoFamiliar;
        if (data.domicilio !== undefined) updateData.domicilio = data.domicilio;
        if (data.ine !== undefined) updateData.ine = data.ine;
        if (data.rfc !== undefined) updateData.rfc = data.rfc;
        if (data.curp !== undefined) updateData.curp = data.curp;

        if (Object.keys(updateData).length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const [result]: any = await pool.query(
            "UPDATE employees SET ? WHERE uuid = ?",
            [updateData, uuid]
        );

        if (result.affectedRows === 0) {
            throw new Error("Empleado no encontrado");
        }

        const updated = await this.findByUUID(uuid);
        if (!updated) {
            throw new Error("Empleado no encontrado");
        }

        return updated;
    }
}
