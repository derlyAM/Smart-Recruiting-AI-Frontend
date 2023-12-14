import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosVacante } from '../dtos/gesionar-vacantes.dtos';


@Injectable({
  providedIn: 'root',
})
export class RecomendacionVacantesIA {
  constructor(private http: HttpClient) {}

  obtenerRecomendacion(): Observable<DatosVacante[]> {
    return this.http.get<DatosVacante[]>('/ia-recommendation/');
  }
}
