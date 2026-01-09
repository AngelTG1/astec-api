import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateEmployeeUseCase } from "../../application/usecases/updateEmployee_usecase";
import { UpdateEmployeeDTO } from "../validatorDTO/updateEmployeeDTO";

export class UpdateEmployeeController {
  constructor(private readonly updateEmployeeUseCase: UpdateEmployeeUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const employeeUuid = req.params.uuid;
      const payload: any = {};

      if (req.body?.asignacionUuid !== undefined) payload.asignacionUuid = req.body.asignacionUuid;
      if (req.body?.statusAsignacion !== undefined) payload.statusAsignacion = req.body.statusAsignacion;
      if (req.body?.fotografia !== undefined) payload.fotografia = req.body.fotografia;
      if (req.body?.nombre !== undefined) payload.nombre = req.body.nombre;
      if (req.body?.apellidoPaterno !== undefined) payload.apellidoPaterno = req.body.apellidoPaterno;
      if (req.body?.apellidoMaterno !== undefined) payload.apellidoMaterno = req.body.apellidoMaterno;
      if (req.body?.fechaNacimiento !== undefined) payload.fechaNacimiento = req.body.fechaNacimiento;
      if (req.body?.telefonoPersonal !== undefined) payload.telefonoPersonal = req.body.telefonoPersonal;
      if (req.body?.telefonoFamiliar !== undefined) payload.telefonoFamiliar = req.body.telefonoFamiliar;
      if (req.body?.domicilio !== undefined) payload.domicilio = req.body.domicilio;
      if (req.body?.ine !== undefined) payload.ine = req.body.ine;
      if (req.body?.rfc !== undefined) payload.rfc = req.body.rfc;
      if (req.body?.curp !== undefined) payload.curp = req.body.curp;

      if (Object.keys(payload).length === 0) {
        return res.status(400).json({ error: "No hay datos para actualizar" });
      }

      const dto = plainToInstance(UpdateEmployeeDTO, payload);
      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const updated = await this.updateEmployeeUseCase.execute(employeeUuid, payload);

      res.status(200).json({
        message: "Empleado actualizado correctamente",
        data: updated
      });

    } catch (error: any) {
      const status = error.message === "Empleado no encontrado" ? 404 : 400;
      res.status(status).json({ error: error.message });
    }
  }
}
