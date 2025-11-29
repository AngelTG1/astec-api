import { Request, Response } from "express";
import { GetAllClientsUseCase } from "../../application/usecases/getAllClients_usecase";

export class GetAllClientsController {
  constructor(private readonly getAllClientsUseCase: GetAllClientsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const clients = await this.getAllClientsUseCase.execute();
      res.json({ data: clients });

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
