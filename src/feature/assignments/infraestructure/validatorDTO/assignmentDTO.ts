import { IsNotEmpty, IsString, IsDateString, IsNumber, IsOptional } from "class-validator";

export class AssignmentDTO {

  @IsNotEmpty()
  @IsString()
  apostamientoUuid!: string;

  @IsNotEmpty()
  @IsString()
  empleadoUuid!: string;

  @IsDateString()
  fechaInicioServicio!: string;

  @IsNotEmpty()
  @IsString()
  tipoServicioAsignado!: string;

  @IsNumber()
  precioServicio!: number;

  @IsNotEmpty()
  @IsString()
  empresaSede!: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
