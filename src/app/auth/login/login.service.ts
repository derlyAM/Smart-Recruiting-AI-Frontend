import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from './login.dtos';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) {}

  iniciarSesion(loginDto: LoginDto): Observable<string> {
    return this.http.post<string>('/auth/login', loginDto);
  }

  cerrarSesion(): void {
    this.tokenService.removerToken();
    this.router.navigate(['/']);
  }
}
