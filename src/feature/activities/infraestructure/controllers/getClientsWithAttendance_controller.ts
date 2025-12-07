import { Request, Response } from "express";
import { GetClientsWithAttendanceUseCase } from "../../application/usecases/getClientsWithAttendance_usecase";

export class GetClientsWithAttendanceController {

  constructor(private readonly usecase: GetClientsWithAttendanceUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const startDate = typeof req.query.startDate === "string" ? req.query.startDate : undefined;
      const endDate = typeof req.query.endDate === "string" ? req.query.endDate : undefined;

      const data = await this.usecase.execute(startDate, endDate);
      res.json({ data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
