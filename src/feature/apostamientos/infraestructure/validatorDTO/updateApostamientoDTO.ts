import { IsNotEmpty, IsString, IsDateString, IsOptional, IsNumber } from "class-validator";

export class UpdateApostamientoDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  clientUuid?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  numeroContrato?: string;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaFinal?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  tipoServicio?: string;

  @IsOptional()
  @IsNumber()
  precioMensual?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  ubicacionServicio?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descripcionContrato?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
