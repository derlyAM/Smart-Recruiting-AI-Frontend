import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoUsuarioService {
  constructor(private http: HttpClient) {}

  /**
   * Trae del servidor la informacion asociada del usuario.
   */
  async cargarInfoUsuario() {
    const infoUsuario = await firstValueFrom(this.http.get('/usuario/'));
    console.log(infoUsuario);
  }

  obtenerRolUsuario(): number {
    return 1;
  }
}
