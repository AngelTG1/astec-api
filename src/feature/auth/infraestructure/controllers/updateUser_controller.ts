import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateUserUseCase } from "../../application/usecases/updateUser_usecase";
import { UpdateUserDTO } from "../validatorDTO/updateUserDTO";

export class UpdateUserController {
  constructor(private readonly usecase: UpdateUserUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const authUser = (req as any).user;
      if (!authUser?.uuid) {
        return res.status(401).json({ error: "Token inválido" });
      }

      if (req.body?.rol !== undefined) {
        return res.status(403).json({ error: "No se permite actualizar el rol" });
      }

      const payload: any = {};
      if (req.body?.nombre !== undefined) payload.nombre = req.body.nombre;
      if (req.body?.apellidos !== undefined) payload.apellidos = req.body.apellidos;
      if (req.body?.correo !== undefined) payload.correo = req.body.correo;
      if (req.body?.password !== undefined) payload.password = req.body.password;

      if (Object.keys(payload).length === 0) {
        return res.status(400).json({ error: "No hay datos para actualizar" });
      }

      const dto = plainToInstance(UpdateUserDTO, payload);
      const errors = await validate(dto);
      if (errors.length > 0) return res.status(400).json({ errors });

      const updated = await this.usecase.execute(authUser.uuid, payload);
      const safeUser = {
        id: updated.id,
        uuid: updated.uuid,
        nombre: updated.nombre,
        apellidos: updated.apellidos,
        correo: updated.correo,
        rol: updated.rol
      };

      res.status(200).json({
        message: "Usuario actualizado correctamente",
        data: safeUser
      });

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
