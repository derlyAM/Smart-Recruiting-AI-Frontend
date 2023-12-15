import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { AlmacenamientoNavegadorService } from './almacenamiento-navegador.service';
import { DatosUsuario } from '../dtos/usuario-dtos';
import { RolUsuario } from '../enums/rol-usuario.enum';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root',
})
export class InfoUsuarioService {
  constructor(private http: HttpClient, private navegador: AlmacenamientoNavegadorService) {}

  /**
   * Trae del servidor la informacion asociada del usuario.
   */
  async cargarInfoUsuario() {
    const infoUsuario = await firstValueFrom(this.http.get<DatosUsuario>('/usuario'));
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

  obtenerNombreUsuario() {
    return this.obtenerInfoUsuario().nombres;
  }

  obtenerUsuarioDeBaseDeDatos(): Observable<DatosUsuario> {
    return this.http.get<DatosUsuario>('/usuario/');
  }

  actualizarUsuario(datosUsuario: DatosUsuario): Observable<Boolean> {
    return this.http.put<Boolean>('/usuario/', datosUsuario);
  }
}
