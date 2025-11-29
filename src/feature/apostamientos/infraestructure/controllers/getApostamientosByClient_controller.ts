import { Request, Response } from "express";
import { GetApostamientosByClientUseCase } from "../../application/usecases/getApostamientosByClient_usecase";

export class GetApostamientosByClientController {
  constructor(private readonly usecase: GetApostamientosByClientUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const clientUuid = req.params.clientUuid;
      const data = await this.usecase.execute(clientUuid);

      res.json({ data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
