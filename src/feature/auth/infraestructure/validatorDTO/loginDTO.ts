import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {

  @IsEmail()
  correo!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
