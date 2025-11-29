import { IsNotEmpty, IsString, IsDateString, IsOptional, IsNumber } from "class-validator";

export class ApostamientoDTO {

  @IsNotEmpty()
  @IsString()
  clientUuid!: string;

  @IsNotEmpty()
  @IsString()
  numeroContrato!: string;

  @IsDateString()
  fechaInicio!: string;

  @IsDateString()
  fechaFinal!: string;

  @IsNotEmpty()
  @IsString()
  tipoServicio!: string;

  @IsNumber()
  precioMensual!: number;

  @IsNotEmpty()
  @IsString()
  ubicacionServicio!: string;

  @IsNotEmpty()
  @IsString()
  descripcionContrato!: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
