import { AlmacenamientoNavegadorService } from '../../shared/services/almacenamiento-navegador.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

interface Token {
  id_usr: number;
  mail: string;
  rol: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private navegador: AlmacenamientoNavegadorService) {}

  guardarToken(token: string): void {
    this.navegador.guardarItem({
      indice: 'token',
      dato: token,
      tipoDato: 'string',
    });
  }

  obtenerToken(): string | null {
    return this.navegador.obtenerItem({
      indice: 'token',
      tipoDato: 'string',
    }) as string;
  }

  obtenerTokenComoJson(): Token {
    const token = this.obtenerToken();
    if (!token) {
      throw new Error('No existe token');
    }
    return new JwtHelperService().decodeToken(token) as Token;
  }

  removerToken(): void {
    this.navegador.removerItem({
      indice: 'token',
    });
  }
}
