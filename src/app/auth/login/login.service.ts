import { HttpClient } from '@angular/common/http';
import { AlmacenamientoNavegadorService } from '../../shared/services/almacenamiento-navegador.service';
import { Injectable } from '@angular/core';
import { LoginDto } from './login.dtos';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private navegador: AlmacenamientoNavegadorService, private http: HttpClient, private router: Router) {}

  private apiUrl = environment.apiUrl;

  iniciarSesion(loginDto: LoginDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/auth/login`, loginDto);
  }

  cerrarSesion(): void {
    this.navegador.removerItem('token');
    this.router.navigate(['/']);
  }

  guardarToken(token: string): void {
    this.navegador.guardarItem('token', token);
  }

  obtenerToken(): string {
    return this.navegador.obtenerItem('token');
  }
}
