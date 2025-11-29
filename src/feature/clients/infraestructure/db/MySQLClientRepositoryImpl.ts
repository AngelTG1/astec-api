import pool from "../../../../core/config/database_conexion";
import { ClientRepository } from "../../domain/client_repository";
import { Client } from "../../domain/entity/client";

export class MySQLClientRepositoryImpl implements ClientRepository {

    async findByRFC(rfc: string): Promise<Client | null> {
        const [rows]: any = await pool.query(
            "SELECT * FROM clients WHERE rfc = ?",
            [rfc]
        );
        return rows.length > 0 ? rows[0] : null;
    }

    async create(client: Client): Promise<Client> {
    const [result]: any = await pool.query(
        "INSERT INTO clients SET ?", client
    );

    return {
        id: result.insertId, 
        ...client
    };
}


    async findAll(): Promise<Client[]> {
        const [rows]: any = await pool.query("SELECT * FROM clients");
        return rows as Client[];
    }

    async findByUUID(uuid: string): Promise<Client | null> {
    const [rows]: any = await pool.query(
        "SELECT * FROM clients WHERE uuid = ?",
        [uuid]
    );
    return rows.length > 0 ? rows[0] : null;
}

}
