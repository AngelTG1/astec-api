export interface User {
  id?: number;
  uuid: string;
  nombre: string;
  correo: string;
  password: string; // hash
  rol: "admin" | "supervisor";
}
