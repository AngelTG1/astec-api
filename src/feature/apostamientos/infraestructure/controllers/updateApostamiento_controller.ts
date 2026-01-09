import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateApostamientoUseCase } from "../../application/usecases/updateApostamiento_usecase";
import { UpdateApostamientoDTO } from "../validatorDTO/updateApostamientoDTO";

export class UpdateApostamientoController {
  constructor(private readonly usecase: UpdateApostamientoUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const apostamientoUuid = req.params.uuid;
      const payload: any = {};

      if (req.body?.clientUuid !== undefined) payload.clientUuid = req.body.clientUuid;
      if (req.body?.numeroContrato !== undefined) payload.numeroContrato = req.body.numeroContrato;
      if (req.body?.fechaInicio !== undefined) payload.fechaInicio = req.body.fechaInicio;
      if (req.body?.fechaFinal !== undefined) payload.fechaFinal = req.body.fechaFinal;
      if (req.body?.tipoServicio !== undefined) payload.tipoServicio = req.body.tipoServicio;
      if (req.body?.precioMensual !== undefined) payload.precioMensual = req.body.precioMensual;
      if (req.body?.ubicacionServicio !== undefined) payload.ubicacionServicio = req.body.ubicacionServicio;
      if (req.body?.descripcionContrato !== undefined) payload.descripcionContrato = req.body.descripcionContrato;
      if (req.body?.observaciones !== undefined) payload.observaciones = req.body.observaciones;

      if (Object.keys(payload).length === 0) {
        return res.status(400).json({ error: "No hay datos para actualizar" });
      }

      const dto = plainToInstance(UpdateApostamientoDTO, payload);
      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const updated = await this.usecase.execute(apostamientoUuid, payload);

      res.status(200).json({
        message: "Apostamiento actualizado correctamente",
        data: updated
      });

    } catch (error: any) {
      const status = error.message === "Apostamiento no encontrado" ? 404 : 400;
      res.status(status).json({ error: error.message });
    }
  }
}
