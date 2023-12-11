import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AlmacenamientoNavegadorService } from './almacenamiento-navegador.service';
import { DatosUsuario } from '../dtos/usuario-dtos';
import { RolUsuario } from '../enums/rol-usuario.enum';

@Injectable({
  providedIn: 'root',
})
export class InfoUsuarioService {
  constructor(private http: HttpClient, private navegador: AlmacenamientoNavegadorService) {}

  /**
   * Trae del servidor la informacion asociada del usuario.
   */
  async cargarInfoUsuario() {
    const infoUsuario = await firstValueFrom(this.http.get<DatosUsuario>('/usuario/'));
    this.navegador.guardarItem({
      indice: 'infoUsuario',
      dato: infoUsuario,
      tipoDato: 'object',
    });
  }

  obtenerInfoUsuario(): DatosUsuario {
    return this.navegador.obtenerItem({ indice: 'infoUsuario', tipoDato: 'object' }) as DatosUsuario;
  }

  usuarioEsReclutador(): boolean {
    return this.obtenerInfoUsuario().rol === RolUsuario.RECLUTADOR;
  }

  usuarioEsPostulante(): boolean {
    return this.obtenerInfoUsuario().rol === RolUsuario.POSTULANTE;
  }
}
