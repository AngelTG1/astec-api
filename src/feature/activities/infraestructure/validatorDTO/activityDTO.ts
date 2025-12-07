import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsMilitaryTime,
  Min,
  ValidateIf
} from "class-validator";

export class ActivityDTO {

  @IsString()
  @IsNotEmpty()
  clientUuid!: string;

  @IsString()
  @IsNotEmpty()
  empleadoUuid!: string;

  @IsDateString()
  fecha!: string;

  @IsIn(["diurno", "nocturno", "descanso"])
  tipoTurno!: "diurno" | "nocturno" | "descanso";

  @ValidateIf(o => o.tipoTurno !== "descanso")
  @IsMilitaryTime({ message: "horaEntrada debe estar en formato HH:mm" })
  horaEntrada?: string;

  @ValidateIf(o => o.tipoTurno !== "descanso")
  @IsMilitaryTime({ message: "horaSalida debe estar en formato HH:mm" })
  horaSalida?: string;

  @IsOptional()
  @IsBoolean()
  terminaSiguienteDia?: boolean;

  @IsNumber()
  @Min(0)
  pago!: number;

  @IsOptional()
  @IsString()
  nota?: string;
}
