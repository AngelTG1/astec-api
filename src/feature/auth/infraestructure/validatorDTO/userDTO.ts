import { IsNotEmpty, IsEmail, IsOptional, IsString } from "class-validator";

export class UserDTO {

  @IsNotEmpty()
  nombre!: string;

  @IsOptional()
  @IsString()
  apellidos?: string;

  @IsEmail()
  correo!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  rol!: "admin" | "supervisor";
}
