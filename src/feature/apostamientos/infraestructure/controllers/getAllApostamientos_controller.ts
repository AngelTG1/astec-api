import { Request, Response } from "express";
import { GetAllApostamientosUseCase } from "../../application/usecases/getAllApostamientos_usecase";

export class GetAllApostamientosController {
  constructor(private readonly usecase: GetAllApostamientosUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const data = await this.usecase.execute();
      res.json({ data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
