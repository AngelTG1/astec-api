import { Request, Response } from "express";
import { GetAllEmployeesUseCase } from "../../application/usecases/getAllEmployees_usecase";

export class GetAllEmployeesController {

  constructor(private readonly usecase: GetAllEmployeesUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const employees = await this.usecase.execute();
      res.json({ data: employees });

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
