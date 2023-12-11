import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosVacante } from '../dtos/gesionar-vacantes.dtos';
import { Observable } from 'rxjs';
import { CrearVacante } from '../dtos/gesionar-vacantes.dtos';

@Injectable({
  providedIn: 'root',
})
export class GestionarVacantesService {
  constructor(private http: HttpClient) {}

  obtenerVacantesPublicadas(): Observable<DatosVacante[]> {
    return this.http.get<DatosVacante[]>('/vacantes-del-reclutador');
  }

  crearVacante(vacante: CrearVacante): Observable<any> {
    return this.http.post('/vacantes', vacante);
  }
}
