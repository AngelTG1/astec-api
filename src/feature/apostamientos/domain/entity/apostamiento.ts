export interface Apostamiento {
  id?: number;
  uuid: string;

  clientUuid: string;

  numeroContrato: string;
  fechaInicio: string;
  fechaFinal: string;
  tipoServicio: string;
  precioMensual: number;
  ubicacionServicio: string;
  descripcionContrato: string;
  observaciones?: string | null;
}
