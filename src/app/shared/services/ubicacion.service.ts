import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ubicacion } from '../dtos/ubicacion.dto';

@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  constructor(private http: HttpClient) {}

  obtenerUbicaciones(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>('/ubicaciones');
  }
}
