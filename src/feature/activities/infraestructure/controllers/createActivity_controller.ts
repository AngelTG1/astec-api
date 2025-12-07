import { Request, Response } from "express";
import { CreateActivityUseCase } from "../../application/usecases/createActivity_usecase";
import { ActivityUUID } from "../../domain/valueObjects/activityUUID";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ActivityDTO } from "../validatorDTO/activityDTO";

export class CreateActivityController {

  constructor(private readonly usecase: CreateActivityUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const dto = plainToInstance(ActivityDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const uuid = new ActivityUUID().getValue();

      const activity = {
        uuid,
        clientUuid: dto.clientUuid,
        empleadoUuid: dto.empleadoUuid,
        fecha: dto.fecha,
        tipoTurno: dto.tipoTurno,
        horaEntrada: dto.tipoTurno === "descanso" ? null : dto.horaEntrada,
        horaSalida: dto.tipoTurno === "descanso" ? null : dto.horaSalida,
        terminaSiguienteDia: dto.terminaSiguienteDia ?? false,
        pago: dto.pago,
        nota: dto.nota ?? null
      };

      const created = await this.usecase.execute(activity);

      res.status(201).json({
        message: "Actividad creada correctamente",
        data: created
      });

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
