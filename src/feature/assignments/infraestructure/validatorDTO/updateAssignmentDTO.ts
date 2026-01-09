import { IsNotEmpty, IsString, IsDateString, IsNumber, IsOptional } from "class-validator";

export class UpdateAssignmentDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  apostamientoUuid?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  empleadoUuid?: string;

  @IsOptional()
  @IsDateString()
  fechaInicioServicio?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  tipoServicioAsignado?: string;

  @IsOptional()
  @IsNumber()
  precioServicio?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  empresaSede?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
