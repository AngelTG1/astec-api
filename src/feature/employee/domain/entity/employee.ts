export interface Employee {
  id?: number;
  uuid: string;

  asignacionUuid?: string | null;
  statusAsignacion: "asignado" | "no_asignado";

  fotografia?: string | null;

  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  telefonoPersonal: string;
  telefonoFamiliar?: string | null;
  domicilio: string;
  ine: string;
  rfc: string;
  curp: string;
}
