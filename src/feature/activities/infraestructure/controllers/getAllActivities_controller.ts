import { Request, Response } from "express";
import { GetAllActivitiesUseCase } from "../../application/usecases/getAllActivities_usecase";

export class GetAllActivitiesController {

  constructor(private readonly usecase: GetAllActivitiesUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const activities = await this.usecase.execute();
      res.json({ data: activities });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
