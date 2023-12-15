import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosVacante, FiltrosVacante, Postulacion } from '../dtos/gesionar-vacantes.dtos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GestionarVacantesService {
  constructor(private http: HttpClient) {}

  obtenerVacantesPublicadas(): Observable<DatosVacante[]> {
    return this.http.get<DatosVacante[]>('/vacantes-del-reclutador');
  }

  crearVacante(vacante: DatosVacante): Observable<any> {
    return this.http.post('/vacantes', vacante);
  }

  eliminarVacante(id_vacante: number): Observable<any> {
    return this.http.delete('/vacantes/' + id_vacante);
  }

  obtenerVacante(id: number): Observable<DatosVacante> {
    return this.http.get<DatosVacante>(`/vacantes/${id}`);
  }

  editarVacante(vacante: DatosVacante): Observable<any> {
    return this.http.put(`/vacantes/`, vacante);
  }

  filtrarVacante(vacante: FiltrosVacante): Observable<any> {
    return this.http.post(`/vacantes_filtradas/`, vacante);
  }

  postularVacante(id: number): Observable<Postulacion> {
    return this.http.post<Postulacion>(`/postular_a_vacante/${id}`, {});
  }

  obtenerVacantesAplicadas(): Observable<DatosVacante[]> {
    return this.http.get<DatosVacante[]>(`/postulaciones`);
  }
  
}
