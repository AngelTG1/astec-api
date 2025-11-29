import { Request, Response } from "express";
import { GetAssignmentByUuidUseCase } from "../../application/usecases/getAssignmentByUuid_usecase";

export class GetAssignmentByUuidController {
  constructor(private readonly usecase: GetAssignmentByUuidUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const uuid = req.params.uuid;
      const data = await this.usecase.execute(uuid);

      if (!data) {
        return res.status(404).json({ error: "Assignment no encontrado" });
      }

      res.json({ data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
