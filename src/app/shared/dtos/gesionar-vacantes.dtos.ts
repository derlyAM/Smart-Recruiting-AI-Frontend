export interface DatosVacante {
  id: number;
  titulo: string;
  descripcion: string;
  usuario_reclutador: number;
  fecha_publicacion: string;
  fecha_cierre: string;
  salario: number;
  remoto: boolean;
  modalidad: string;
  ubicacion: number;
  area_trabajo: string;
  annos_experiencia: number;
}

export interface FiltrosVacante {
  titulo: string;
  fecha_publicacion: string;
  fecha_cierre: string;
  salario: number;
  remoto: boolean;
  modalidad: string;
  ubicacion: number;
  area_trabajo: string;
  annos_experiencia: number;
}

export interface Postulacion {
  id: number;
  id_vacante: number;
  id_perfil_postulante: number;
}

export interface CrearVacante extends Omit<DatosVacante, 'id'> {}
