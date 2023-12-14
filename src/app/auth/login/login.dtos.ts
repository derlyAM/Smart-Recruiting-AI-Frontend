export interface LoginDto {
  correo: string;
  passwd: string;
}


export interface RegisterDto {
  names: string;
  surnames: string;
  correo: string;
  passwd: string;
  rol_id: number;
}