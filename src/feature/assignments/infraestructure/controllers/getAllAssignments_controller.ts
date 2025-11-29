import { Request, Response } from "express";
import { GetAllAssignmentsUseCase } from "../../application/usecases/getAllAssignments_usecase";

export class GetAllAssignmentsController {
  constructor(private readonly usecase: GetAllAssignmentsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const data = await this.usecase.execute();
      res.json({ data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
