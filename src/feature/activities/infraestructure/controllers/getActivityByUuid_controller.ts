import { Request, Response } from "express";
import { GetActivityByUuidUseCase } from "../../application/usecases/getActivityByUuid_usecase";

export class GetActivityByUuidController {

  constructor(private readonly usecase: GetActivityByUuidUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const activity = await this.usecase.execute(uuid);

      if (!activity) {
        return res.status(404).json({ error: "Actividad no encontrada" });
      }

      res.json({ data: activity });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
