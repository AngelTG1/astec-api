import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/usecases/registerUser_usecase";
import { UserUUID } from "../../domain/valueObjects/userUUID";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserDTO } from "../validatorDTO/userDTO";

export class RegisterUserController {

  constructor(private readonly usecase: RegisterUserUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const payload = { ...req.body, rol: req.body.rol ?? "supervisor" };
      const dto = plainToInstance(UserDTO, payload);
      const errors = await validate(dto);

      if (errors.length > 0) return res.status(400).json({ errors });

      const uuid = new UserUUID().getValue();

      const user = { uuid, ...payload };

      const created = await this.usecase.execute(user);
      const safeUser = {
        id: created.id,
        uuid: created.uuid,
        nombre: created.nombre,
        apellidos: created.apellidos,
        correo: created.correo,
        rol: created.rol
      };

      res.status(201).json({
        message: "Usuario creado correctamente",
        data: safeUser
      });

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
