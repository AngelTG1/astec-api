import { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/usecases/loginUser_usecase";

export class LoginUserController {

  constructor(private readonly usecase: LoginUserUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const { correo, password } = req.body;

      const { user, token } = await this.usecase.execute(correo, password);

      res.json({
        message: "Login exitoso",
        token,
        user
      });

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
