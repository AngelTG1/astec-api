export interface Client {
  id?: number;         
  uuid: string;        

  razonSocial: string;
  rfc: string;
  regimenFiscal: string;
  correo: string;

  codigoPostal: string;
  pais: string;
  ciudad: string;
  municipio: string;
  colonia: string;
  calle: string;
  numeroExterior: string;

  usoCfdi: string;
  modoFacturacion: string;
  formaPago: string;

  observaciones?: string;
}
