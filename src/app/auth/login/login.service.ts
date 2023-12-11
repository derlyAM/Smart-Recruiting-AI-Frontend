import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from './login.dtos';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlmacenamientoNavegadorService } from '../../shared/services/almacenamiento-navegador.service';
import { InfoUsuarioService } from '../../shared/services/info-usuario.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private navegador: AlmacenamientoNavegadorService,
    private infoUsuario: InfoUsuarioService
  ) {}

  iniciarSesion(loginDto: LoginDto): Observable<string> {
    return this.http.post<string>('/auth/login', loginDto);
  }

  cerrarSesion(): void {
    this.navegador.limpiarAlmacenamiento();
    this.router.navigate(['/']);
  }

  usuarioHaIniciadoSesion(): boolean {
    return this.infoUsuario.obtenerInfoUsuario() !== null;
  }
}
