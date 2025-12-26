import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../application/usecases/getAllUsers_usecase";

export class GetAllUsersController {
  constructor(private readonly usecase: GetAllUsersUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const users = await this.usecase.execute();
      const safeUsers = users.map((user) => ({
        id: user.id,
        uuid: user.uuid,
        nombre: user.nombre,
        apellidos: user.apellidos,
        correo: user.correo,
        rol: user.rol
      }));

      res.status(200).json({ data: safeUsers });

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
