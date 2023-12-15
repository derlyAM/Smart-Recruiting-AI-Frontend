import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDto } from '../login/login.dtos';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    constructor(
        private http: HttpClient,
    ) { }

    registrarse(registerDto: RegisterDto): Observable<void> {
        return this.http.post<void>('/auth/registrarse', registerDto);
    }
}