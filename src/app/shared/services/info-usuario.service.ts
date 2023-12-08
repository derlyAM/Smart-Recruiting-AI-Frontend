import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoUsuarioService {
  constructor(private http: HttpClient) {}

  async cargarInfoUsuario() {
    const infoUsuario = await firstValueFrom(this.http.get('/usuario/'));
    console.log(infoUsuario);
  }

  obtenerRolUsuario(): number {
    return 1;
  }
}
