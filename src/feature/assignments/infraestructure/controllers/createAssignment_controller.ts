import { Request, Response } from "express";
import { CreateAssignmentUseCase } from "../../application/usecases/createAssignment_usecase";
import { AssignmentUUID } from "../../domain/valueObjects/assignmentUUID";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { AssignmentDTO } from "../validatorDTO/assignmentDTO";

export class CreateAssignmentController {

  constructor(private readonly usecase: CreateAssignmentUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const dto = plainToInstance(AssignmentDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const uuid = new AssignmentUUID().getValue();

      const assignment = {
        uuid,
        ...req.body
      };

      const created = await this.usecase.execute(assignment);

      res.status(201).json({
        message: "Servicio asignado correctamente",
        data: created
      });

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
