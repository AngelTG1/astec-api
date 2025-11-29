import pool from "../../../../core/config/database_conexion";
import { UserRepository } from "../../domain/user_repository";
import { User } from "../../domain/entity/user";

export class MySQLUserRepositoryImpl implements UserRepository {

  async create(user: User): Promise<User> {
    const [result]: any = await pool.query(
      "INSERT INTO users SET ?", user
    );

    return { id: result.insertId, ...user };
  }

  async findByCorreo(correo: string): Promise<User | null> {
    const [rows]: any = await pool.query(
      "SELECT * FROM users WHERE correo = ?",
      [correo]
    );
    return rows.length > 0 ? rows[0] : null;
  }
}
