import { Request, Response } from "express";
import { GetApostamientoByUuidUseCase } from "../../application/usecases/getApostamientoByUuid_usecase";

export class GetApostamientoByUuidController {
  constructor(private readonly usecase: GetApostamientoByUuidUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const uuid = req.params.uuid;
      const data = await this.usecase.execute(uuid);

      if (!data) {
        return res.status(404).json({ error: "Apostamiento no encontrado" });
      }

      res.json({ data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
