import { Request, Response } from "express";
import { GetEmployeeByUuidUseCase } from "../../application/usecases/getEmployeeByUuid_usecase";

export class GetEmployeeByUuidController {

  constructor(private readonly usecase: GetEmployeeByUuidUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const uuid = req.params.uuid;

      const employee = await this.usecase.execute(uuid);

      if (!employee) {
        return res.status(404).json({ error: "Empleado no encontrado" });
      }

      res.json({ data: employee });

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
