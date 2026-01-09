import { IsNotEmpty, IsString, IsEmail, IsOptional, Matches } from "class-validator";
import { IsRfc } from "../../../shared/validators/isRfc";

export class UpdateClientDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  razonSocial?: string;

  @IsOptional()
  @IsString()
  @IsRfc()
  rfc?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  regimenFiscal?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @Matches(/^\d{5}$/, { message: "codigoPostal debe tener 5 digitos numericos" })
  codigoPostal?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  pais?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  ciudad?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  municipio?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  colonia?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  calle?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  numeroExterior?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  usoCfdi?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  modoFacturacion?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  formaPago?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
