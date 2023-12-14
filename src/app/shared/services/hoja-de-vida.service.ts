import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HojaDeVidaService {
  constructor(private http: HttpClient) {}

  obtenerHojaDeVidaEnFormatoBase64(): Observable<string> {
    // 'data:application/pdf;base64,';
    return this.http.get<string>('/generar-hoja-de-vida/');
  }
}
