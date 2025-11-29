import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class UserDTO {

  @IsNotEmpty()
  nombre!: string;

  @IsEmail()
  correo!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  rol!: "admin" | "supervisor";
}
