export interface Activity {
  id?: number;
  uuid: string;

  clientUuid: string;
  empleadoUuid: string;

  fecha: string;                       // YYYY-MM-DD
  tipoTurno: "diurno" | "nocturno" | "descanso";
  horaEntrada?: string | null;         // HH:mm
  horaSalida?: string | null;          // HH:mm
  terminaSiguienteDia: boolean;

  pago: number;
  nota?: string | null;
}
