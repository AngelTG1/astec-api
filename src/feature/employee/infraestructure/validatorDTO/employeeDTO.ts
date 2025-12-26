import { IsNotEmpty, IsString, IsOptional, Length, IsDateString, Matches } from "class-validator";
import { IsCurp } from "../../../shared/validators/isCurp";
import { IsRfc } from "../../../shared/validators/isRfc";

export class EmployeeDTO {

  @IsOptional()
  asignacionUuid?: string | null;

  @IsNotEmpty()
  statusAsignacion!: "asignado" | "no_asignado";

  @IsOptional()
  fotografia?: string;

  @IsNotEmpty()
  nombre!: string;

  @IsNotEmpty()
  apellidoPaterno!: string;

  @IsNotEmpty()
  apellidoMaterno!: string;

  @IsDateString()
  fechaNacimiento!: string;

  @Length(10, 10)
  @Matches(/^\d{10}$/, { message: "telefonoPersonal debe tener 10 digitos numericos" })
  telefonoPersonal!: string;

  @IsOptional()
  @Length(10, 10)
  @Matches(/^\d{10}$/, { message: "telefonoFamiliar debe tener 10 digitos numericos" })
  telefonoFamiliar?: string;

  @IsNotEmpty()
  domicilio!: string;

  @IsNotEmpty()
  ine!: string;

  @IsNotEmpty()
  @IsRfc()
  rfc!: string;

  @IsNotEmpty()
  @IsCurp()
  curp!: string;
}
