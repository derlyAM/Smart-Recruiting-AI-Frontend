import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoUsuarioService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  async cargarInfoUsuario() {
    const infoUsuario = await firstValueFrom(this.http.get(`${this.apiUrl}/usuario/`));
    console.log(infoUsuario);
  }

  obtenerRolUsuario(): number {
    return 1;
  }
}
