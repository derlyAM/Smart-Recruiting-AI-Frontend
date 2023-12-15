import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PerfilPostulanteDto, ExperienciaDto, EducacionDto } from './perfil-postulante.dtos';

@Injectable({
  providedIn: 'root',
})
export class PerfilPostulanteService {
  constructor(private http: HttpClient) {}

  obtenerPerfilPostulante(): Observable<PerfilPostulanteDto> {
    return this.http.get<PerfilPostulanteDto>('/perfil-postulante');
  }

  obtenerExperienciaPostulante(): Observable<ExperienciaDto[]> {
    return this.http.get<ExperienciaDto[]>('/experiencia');
  }

  obtenerEducacionPostulante(): Observable<EducacionDto[]> {
    return this.http.get<EducacionDto[]>('/historial-academico');
  }

  actualizarPerfilPostulante(perfilActualizado: PerfilPostulanteDto): Observable<PerfilPostulanteDto> {
    return this.http.put<PerfilPostulanteDto>('/perfil-postulante', perfilActualizado);
  }

  actualizarExperienciaPostulante(experienciaActualizada: ExperienciaDto): Observable<ExperienciaDto> {
    return this.http.put<ExperienciaDto>('/experiencia', experienciaActualizada);
  }
}
