import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateAssignmentUseCase } from "../../application/usecases/updateAssignment_usecase";
import { UpdateAssignmentDTO } from "../validatorDTO/updateAssignmentDTO";

export class UpdateAssignmentController {
  constructor(private readonly usecase: UpdateAssignmentUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const assignmentUuid = req.params.uuid;
      const payload: any = {};

      if (req.body?.apostamientoUuid !== undefined) payload.apostamientoUuid = req.body.apostamientoUuid;
      if (req.body?.empleadoUuid !== undefined) payload.empleadoUuid = req.body.empleadoUuid;
      if (req.body?.fechaInicioServicio !== undefined) payload.fechaInicioServicio = req.body.fechaInicioServicio;
      if (req.body?.tipoServicioAsignado !== undefined) payload.tipoServicioAsignado = req.body.tipoServicioAsignado;
      if (req.body?.precioServicio !== undefined) payload.precioServicio = req.body.precioServicio;
      if (req.body?.empresaSede !== undefined) payload.empresaSede = req.body.empresaSede;
      if (req.body?.observaciones !== undefined) payload.observaciones = req.body.observaciones;

      if (Object.keys(payload).length === 0) {
        return res.status(400).json({ error: "No hay datos para actualizar" });
      }

      const dto = plainToInstance(UpdateAssignmentDTO, payload);
      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const updated = await this.usecase.execute(assignmentUuid, payload);

      res.status(200).json({
        message: "Asignación actualizada correctamente",
        data: updated
      });

    } catch (error: any) {
      const status = error.message === "Asignación no encontrada" ? 404 : 400;
      res.status(status).json({ error: error.message });
    }
  }
}
