export interface Assignment {
  id?: number;
  uuid: string;

  apostamientoUuid: string;  // contrato
  empleadoUuid: string;      // debe existir

  fechaInicioServicio: string;
  tipoServicioAsignado: string;
  precioServicio: number;
  empresaSede: string;

  observaciones?: string | null;
}
