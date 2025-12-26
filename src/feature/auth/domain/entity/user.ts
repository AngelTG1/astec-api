export interface User {
  id?: number;
  uuid: string;
  nombre: string;
  apellidos?: string;
  correo: string;
  password: string; 
  rol: "admin" | "supervisor";
}
