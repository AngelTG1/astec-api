import pool from "../../../../core/config/database_conexion";
import { UserRepository } from "../../domain/user_repository";
import { User } from "../../domain/entity/user";

export class MySQLUserRepositoryImpl implements UserRepository {
  private columnsCache: Set<string> | null = null;
  private columnsLoaded = false;

  private async getUserColumns(): Promise<Set<string> | null> {
    if (this.columnsLoaded) return this.columnsCache;

    this.columnsLoaded = true;
    try {
      const [rows]: any = await pool.query("SHOW COLUMNS FROM users");
      this.columnsCache = new Set(rows.map((row: any) => row.Field));
      return this.columnsCache;
    } catch {
      return null;
    }
  }

  async create(user: User): Promise<User> {
    const data: any = {
      uuid: user.uuid,
      nombre: user.nombre,
      correo: user.correo,
      password: user.password,
      rol: user.rol
    };

    const columns = await this.getUserColumns();
    if (user.apellidos) {
      if (columns?.has("apellidos")) data.apellidos = user.apellidos;
      else if (columns?.has("apellido")) data.apellido = user.apellidos;
    }

    const [result]: any = await pool.query(
      "INSERT INTO users SET ?", data
    );

    return { id: result.insertId, ...user };
  }

  async findByCorreo(correo: string): Promise<User | null> {
    const [rows]: any = await pool.query(
      "SELECT * FROM users WHERE correo = ?",
      [correo]
    );
    if (rows.length === 0) return null;

    const row = rows[0] as User & { apellido?: string };
    if (!row.apellidos && row.apellido) {
      row.apellidos = row.apellido;
    }
    return row;
  }

  async findByUuid(uuid: string): Promise<User | null> {
    const [rows]: any = await pool.query(
      "SELECT * FROM users WHERE uuid = ?",
      [uuid]
    );
    if (rows.length === 0) return null;

    const row = rows[0] as User & { apellido?: string };
    if (!row.apellidos && row.apellido) {
      row.apellidos = row.apellido;
    }
    return row;
  }

  async updateByUuid(uuid: string, data: Partial<User>): Promise<User> {
    const updateData: any = {};

    if (data.nombre !== undefined) updateData.nombre = data.nombre;
    if (data.correo !== undefined) updateData.correo = data.correo;
    if (data.password !== undefined) updateData.password = data.password;

    if (data.apellidos !== undefined) {
      const columns = await this.getUserColumns();
      if (columns?.has("apellidos")) updateData.apellidos = data.apellidos;
      else if (columns?.has("apellido")) updateData.apellido = data.apellidos;
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error("No hay campos para actualizar");
    }

    await pool.query(
      "UPDATE users SET ? WHERE uuid = ?",
      [updateData, uuid]
    );

    const updated = await this.findByUuid(uuid);
    if (!updated) throw new Error("Usuario no encontrado");
    return updated;
  }

  async findAll(): Promise<User[]> {
    const [rows]: any = await pool.query(
      "SELECT * FROM users ORDER BY id DESC"
    );

    return (rows as (User & { apellido?: string })[]).map((row) => {
      if (!row.apellidos && row.apellido) {
        row.apellidos = row.apellido;
      }
      return row as User;
    });
  }
}
