import { IsNotEmpty, IsString, IsOptional, Length, IsDateString } from "class-validator";

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
  telefonoPersonal!: string;

  @IsOptional()
  @Length(10, 10)
  telefonoFamiliar?: string;

  @IsNotEmpty()
  domicilio!: string;

  @IsNotEmpty()
  ine!: string;

  @IsNotEmpty()
  rfc!: string;

  @IsNotEmpty()
  curp!: string;
}
