import { Request, Response } from "express";
import { CreateEmployeeUseCase } from "../../application/usecases/createEmployee_usecase";
import { EmployeeUUID } from "../../domain/valueObjects/employeeUUID";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { EmployeeDTO } from "../validatorDTO/employeeDTO";

export class CreateEmployeeController {

  constructor(private readonly createEmployeeUseCase: CreateEmployeeUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      // Validación DTO
      const dto = plainToInstance(EmployeeDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      // Generar UUID real del empleado
      const uuid = new EmployeeUUID().getValue();

      const employee = {
        uuid,
        asignacionUuid: req.body.asignacionUuid ?? null,
        statusAsignacion: req.body.statusAsignacion ?? "no_asignado",

        fotografia: req.body.fotografia ?? null,
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno,
        fechaNacimiento: req.body.fechaNacimiento,
        telefonoPersonal: req.body.telefonoPersonal,
        telefonoFamiliar: req.body.telefonoFamiliar ?? null,
        domicilio: req.body.domicilio,
        ine: req.body.ine,
        rfc: req.body.rfc,
        curp: req.body.curp
      };

      // Crear empleado
      const created = await this.createEmployeeUseCase.execute(employee);

      res.status(201).json({
        message: "Empleado registrado correctamente",
        data: created
      });

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
