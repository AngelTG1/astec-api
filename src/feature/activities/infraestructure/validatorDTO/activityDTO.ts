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

import { IsTodayOrFuture } from "./validators/isTodayOrFuture";

export class ActivityDTO {

  @IsString()
  @IsNotEmpty()
  clientUuid!: string;

  @IsString()
  @IsNotEmpty()
  empleadoUuid!: string;

  @IsDateString({}, { message: "fecha debe tener formato YYYY-MM-DD" })
  @IsTodayOrFuture({ message: "Solo se permiten fechas actuales o futuras" })
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
