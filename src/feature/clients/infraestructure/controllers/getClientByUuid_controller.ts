import { Request, Response } from "express";
import { GetClientByUuidUseCase } from "../../application/usecases/getClientByUuid_usecase";

export class GetClientByUuidController {
  constructor(private readonly getClientByUuIdUseCase: GetClientByUuidUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const clienteId = req.params.id;
      const client = await this.getClientByUuIdUseCase.execute(clienteId);

      if (!client) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }

      res.json({ data: client });
      
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
