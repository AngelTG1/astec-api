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

    async updateByUuid(uuid: string, data: Partial<Client>): Promise<Client> {
        const updateData: any = {};

        if (data.razonSocial !== undefined) updateData.razonSocial = data.razonSocial;
        if (data.rfc !== undefined) updateData.rfc = data.rfc;
        if (data.regimenFiscal !== undefined) updateData.regimenFiscal = data.regimenFiscal;
        if (data.correo !== undefined) updateData.correo = data.correo;
        if (data.codigoPostal !== undefined) updateData.codigoPostal = data.codigoPostal;
        if (data.pais !== undefined) updateData.pais = data.pais;
        if (data.ciudad !== undefined) updateData.ciudad = data.ciudad;
        if (data.municipio !== undefined) updateData.municipio = data.municipio;
        if (data.colonia !== undefined) updateData.colonia = data.colonia;
        if (data.calle !== undefined) updateData.calle = data.calle;
        if (data.numeroExterior !== undefined) updateData.numeroExterior = data.numeroExterior;
        if (data.usoCfdi !== undefined) updateData.usoCfdi = data.usoCfdi;
        if (data.modoFacturacion !== undefined) updateData.modoFacturacion = data.modoFacturacion;
        if (data.formaPago !== undefined) updateData.formaPago = data.formaPago;
        if (data.observaciones !== undefined) updateData.observaciones = data.observaciones ?? null;

        if (Object.keys(updateData).length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const [result]: any = await pool.query(
            "UPDATE clients SET ? WHERE uuid = ?",
            [updateData, uuid]
        );

        if (result.affectedRows === 0) {
            throw new Error("Cliente no encontrado");
        }

        const updated = await this.findByUUID(uuid);
        if (!updated) {
            throw new Error("Cliente no encontrado");
        }

        return updated;
    }

}
