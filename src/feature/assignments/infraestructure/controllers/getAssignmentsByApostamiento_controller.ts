import { Request, Response } from "express";
import { GetAssignmentsByApostamientoUseCase } from "../../application/usecases/getAssignmentsByApostamiento_usecase";

export class GetAssignmentsByApostamientoController {
  constructor(private readonly usecase: GetAssignmentsByApostamientoUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const apostamientoUuid = req.params.uuid;
      const data = await this.usecase.execute(apostamientoUuid);

      res.json({ data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
