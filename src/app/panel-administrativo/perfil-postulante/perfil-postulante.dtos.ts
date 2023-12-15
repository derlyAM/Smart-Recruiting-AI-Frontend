export interface PerfilPostulanteDto {
  id: number
  id_usuario: number
  resumen: string 
  habilidades: string 
  idiomas: string 
  link: string 
  referencias: string 
  }
export interface ExperienciaDto{
  nombre_empresa:string
  contacto: string
  tipo_cargo: string
  fecha_inicio: string
  fecha_finalizacion: string
  responsabilidades: string
}
export interface EducacionDto{
  titulo_obtenido: string
  institucion: string
  area_de_estudio: string
  fecha_inicio: string
  fecha_finalizacion: string
  promedio_ponderado: number
  reconocimientos: string
}
  