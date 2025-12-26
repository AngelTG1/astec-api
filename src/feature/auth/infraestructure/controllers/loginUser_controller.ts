import { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/usecases/loginUser_usecase";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { LoginDTO } from "../validatorDTO/loginDTO";

export class LoginUserController {

  constructor(private readonly usecase: LoginUserUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const dto = plainToInstance(LoginDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) return res.status(400).json({ errors });

      const { correo, password } = dto;

      const { user, token } = await this.usecase.execute(correo, password);
      const safeUser = {
        id: user.id,
        uuid: user.uuid,
        nombre: user.nombre,
        apellidos: user.apellidos,
        correo: user.correo,
        rol: user.rol
      };

      res.json({
        message: "Login exitoso",
        token,
        user: safeUser
      });

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
