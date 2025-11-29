import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";

export class ClientDTO {
  @IsNotEmpty()
  @IsString()
  razonSocial!: string;

  @IsNotEmpty()
  @IsString()
  rfc!: string;

  @IsNotEmpty()
  @IsString()
  regimenFiscal!: string;

  @IsEmail()
  correo!: string;

  @IsNotEmpty()
  codigoPostal!: string;

  @IsNotEmpty()
  pais!: string;

  @IsNotEmpty()
  ciudad!: string;

  @IsNotEmpty()
  municipio!: string;

  @IsNotEmpty()
  colonia!: string;

  @IsNotEmpty()
  calle!: string;

  @IsNotEmpty()
  numeroExterior!: string;

  @IsNotEmpty()
  usoCfdi!: string;

  @IsNotEmpty()
  modoFacturacion!: string;

  @IsNotEmpty()
  formaPago!: string;

  @IsOptional()
  observaciones?: string;
}
