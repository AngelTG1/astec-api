import { Request, Response } from "express";
import { GetActivitiesByEmpleadoUseCase } from "../../application/usecases/getActivitiesByEmpleado_usecase";

export class GetActivitiesByEmpleadoController {

  constructor(private readonly usecase: GetActivitiesByEmpleadoUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const startDate = typeof req.query.startDate === "string" ? req.query.startDate : undefined;
      const endDate = typeof req.query.endDate === "string" ? req.query.endDate : undefined;

      const activities = await this.usecase.execute(uuid, startDate, endDate);

      res.json({ data: activities });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
