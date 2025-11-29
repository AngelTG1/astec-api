import { Request, Response } from "express";
import { CreateClientUseCase } from "../../application/usecases/createClient_usecase";
import { ClientUUID } from "../../domain/valueObjects/clientId";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ClientDTO } from "../validatorDTO/clientDTO";

export class CreateClientController {

  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const dto = plainToInstance(ClientDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({ error: errors });
      }

      const uuid = new ClientUUID().getValue();

      const client = { uuid, ...req.body };

      const createdClient = await this.createClientUseCase.execute(client);

      res.status(201).json({
        message: "Cliente registrado correctamente",
        data: createdClient,
      });

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
