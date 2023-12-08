import { HttpClient } from '@angular/common/http';
import { BrowserStorageService } from './../../shared/services/browser-storage.service';
import { Injectable } from '@angular/core';
import { LoginDto } from './login.dtos';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private browserStorage: BrowserStorageService, private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  iniciarSesion(loginDto: LoginDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/auth/login`, loginDto);
  }

  guardarToken(token: string): void {
    this.browserStorage.guardarItem('token', token);
  }

  obtenerToken(): string {
    return this.browserStorage.obtenerItem('token');
  }
}
