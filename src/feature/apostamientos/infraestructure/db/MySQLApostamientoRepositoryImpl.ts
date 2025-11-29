import pool from "../../../../core/config/database_conexion";
import { ApostamientoRepository } from "../../domain/apostamiento_repository";
import { Apostamiento } from "../../domain/entity/apostamiento";

export class MySQLApostamientoRepositoryImpl implements ApostamientoRepository {

    // Crear apostamiento
    async create(apostamiento: Apostamiento): Promise<Apostamiento> {

        // 1️⃣ Validar que el cliente exista
        const [clientRows]: any = await pool.query(
            "SELECT uuid FROM clients WHERE uuid = ?",
            [apostamiento.clientUuid]
        );

        if (clientRows.length === 0) {
            throw new Error("El cliente no existe. Verifica el clientUuid.");
        }

        // 2️⃣ Insertar apostamiento
        const [result]: any = await pool.query(
            "INSERT INTO apostamientos SET ?", {
            uuid: apostamiento.uuid,
            clientUuid: apostamiento.clientUuid,

            numeroContrato: apostamiento.numeroContrato,
            fechaInicio: apostamiento.fechaInicio,
            fechaFinal: apostamiento.fechaFinal,
            tipoServicio: apostamiento.tipoServicio,
            precioMensual: apostamiento.precioMensual,
            ubicacionServicio: apostamiento.ubicacionServicio,
            descripcionContrato: apostamiento.descripcionContrato,
            observaciones: apostamiento.observaciones ?? null
        }
        );

        return {
            id: result.insertId,
            ...apostamiento
        };
    }

    // Buscar apostamiento por UUID
    async findByUUID(uuid: string): Promise<Apostamiento | null> {
        const [rows]: any = await pool.query(
            "SELECT * FROM apostamientos WHERE uuid = ?",
            [uuid]
        );
        return rows.length > 0 ? rows[0] : null;
    }

    async findAll(): Promise<Apostamiento[]> {
        const [rows]: any = await pool.query(
            "SELECT * FROM apostamientos"
        );
        return rows as Apostamiento[];
    }


    // Buscar todos por clientUuid
    async findByClient(clientUuid: string): Promise<Apostamiento[]> {
        const [rows]: any = await pool.query(
            "SELECT * FROM apostamientos WHERE clientUuid = ?",
            [clientUuid]
        );
        return rows as Apostamiento[];
    }
}
