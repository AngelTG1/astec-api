import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateClientUseCase } from "../../application/usecases/updateClient_usecase";
import { UpdateClientDTO } from "../validatorDTO/updateClientDTO";

export class UpdateClientController {
  constructor(private readonly updateClientUseCase: UpdateClientUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const clientUuid = req.params.uuid;
      const payload: any = {};

      if (req.body?.razonSocial !== undefined) payload.razonSocial = req.body.razonSocial;
      if (req.body?.rfc !== undefined) payload.rfc = req.body.rfc;
      if (req.body?.regimenFiscal !== undefined) payload.regimenFiscal = req.body.regimenFiscal;
      if (req.body?.correo !== undefined) payload.correo = req.body.correo;
      if (req.body?.codigoPostal !== undefined) payload.codigoPostal = req.body.codigoPostal;
      if (req.body?.pais !== undefined) payload.pais = req.body.pais;
      if (req.body?.ciudad !== undefined) payload.ciudad = req.body.ciudad;
      if (req.body?.municipio !== undefined) payload.municipio = req.body.municipio;
      if (req.body?.colonia !== undefined) payload.colonia = req.body.colonia;
      if (req.body?.calle !== undefined) payload.calle = req.body.calle;
      if (req.body?.numeroExterior !== undefined) payload.numeroExterior = req.body.numeroExterior;
      if (req.body?.usoCfdi !== undefined) payload.usoCfdi = req.body.usoCfdi;
      if (req.body?.modoFacturacion !== undefined) payload.modoFacturacion = req.body.modoFacturacion;
      if (req.body?.formaPago !== undefined) payload.formaPago = req.body.formaPago;
      if (req.body?.observaciones !== undefined) payload.observaciones = req.body.observaciones;

      if (Object.keys(payload).length === 0) {
        return res.status(400).json({ error: "No hay datos para actualizar" });
      }

      const dto = plainToInstance(UpdateClientDTO, payload);
      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const updated = await this.updateClientUseCase.execute(clientUuid, payload);

      res.status(200).json({
        message: "Cliente actualizado correctamente",
        data: updated
      });

    } catch (error: any) {
      const status = error.message === "Cliente no encontrado" ? 404 : 400;
      res.status(status).json({ error: error.message });
    }
  }
}
