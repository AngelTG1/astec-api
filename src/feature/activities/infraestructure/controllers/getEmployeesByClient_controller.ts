import { Request, Response } from "express";
import { GetEmployeesByClientUseCase } from "../../application/usecases/getEmployeesByClient_usecase";

export class GetEmployeesByClientController {

  constructor(private readonly usecase: GetEmployeesByClientUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const employees = await this.usecase.execute(uuid);
      res.json({ data: employees });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
