import { Request, Response } from "express";
import { GetAssignmentsByEmpleadoUseCase } from "../../application/usecases/getAssignmentsByEmpleado_usecase";

export class GetAssignmentsByEmpleadoController {
  constructor(private readonly usecase: GetAssignmentsByEmpleadoUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const empleadoUuid = req.params.uuid;
      const data = await this.usecase.execute(empleadoUuid);

      res.json({ data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
