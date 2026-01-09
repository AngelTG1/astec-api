import { IsNotEmpty, IsString, IsOptional, Length, IsDateString, Matches, IsIn } from "class-validator";
import { IsCurp } from "../../../shared/validators/isCurp";
import { IsRfc } from "../../../shared/validators/isRfc";

export class UpdateEmployeeDTO {
  @IsOptional()
  @IsString()
  asignacionUuid?: string | null;

  @IsOptional()
  @IsIn(["asignado", "no_asignado"])
  statusAsignacion?: "asignado" | "no_asignado";

  @IsOptional()
  @IsString()
  fotografia?: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  apellidoPaterno?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  apellidoMaterno?: string;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @IsOptional()
  @Length(10, 10)
  @Matches(/^\d{10}$/, { message: "telefonoPersonal debe tener 10 digitos numericos" })
  telefonoPersonal?: string;

  @IsOptional()
  @Length(10, 10)
  @Matches(/^\d{10}$/, { message: "telefonoFamiliar debe tener 10 digitos numericos" })
  telefonoFamiliar?: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  domicilio?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  ine?: string;

  @IsOptional()
  @IsRfc()
  rfc?: string;

  @IsOptional()
  @IsCurp()
  curp?: string;
}
