import { IsNotEmpty, IsString, IsEmail, IsOptional, Matches } from "class-validator";
import { IsRfc } from "../../../shared/validators/isRfc";

export class ClientDTO {
  @IsNotEmpty()
  @IsString()
  razonSocial!: string;

  @IsNotEmpty()
  @IsString()
  @IsRfc()
  rfc!: string;

  @IsNotEmpty()
  @IsString()
  regimenFiscal!: string;

  @IsEmail()
  correo!: string;

  @IsNotEmpty()
  @Matches(/^\d{5}$/, { message: "codigoPostal debe tener 5 digitos numericos" })
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
