import { Request, Response } from "express";
import { CreateApostamientoUseCase } from "../../application/usecases/createApostamiento_usecase";
import { ApostamientoUUID } from "../../domain/valueObjects/apostamientoUUID";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ApostamientoDTO } from "../validatorDTO/apostamientoDTO";

export class CreateApostamientoController {

  constructor(private readonly usecase: CreateApostamientoUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const dto = plainToInstance(ApostamientoDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const uuid = new ApostamientoUUID().getValue();

      const apostamiento = {
        uuid,
        ...req.body
      };

      const created = await this.usecase.execute(apostamiento);

      res.status(201).json({
        message: "Apostamiento creado correctamente",
        data: created
      });

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
