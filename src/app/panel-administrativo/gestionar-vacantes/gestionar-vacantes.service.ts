import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosVacante } from './gesionar-vacantes.dtos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GestionarVacantesService {
  constructor(private http: HttpClient) {}

  obtenerVacantesPublicadas(): Observable<DatosVacante[]> {
    return this.http.get<DatosVacante[]>('/vacantes-del-reclutador');
  }
}
