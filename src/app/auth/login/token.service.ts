import { AlmacenamientoNavegadorService } from '../../shared/services/almacenamiento-navegador.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';

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
  constructor(private navegador: AlmacenamientoNavegadorService) { }


  encriptarToken(token: string): string {
    const encryptedToken = CryptoJS.AES.encrypt(token, environment.secret_key).toString();
    return encryptedToken;
  }

  desencriptarToken(encryptedToken: string): string {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, environment.secret_key);
    const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken;
  }

  guardarToken(token: string): void {
    const encryptedToken = this.encriptarToken(token)
    this.navegador.guardarItem({
      indice: 'token',
      dato: encryptedToken,
      tipoDato: 'string',
    });
  }

  obtenerToken(): string | null {
    const item = this.navegador.obtenerItem({
      indice: 'token',
      tipoDato: 'string',
    }) as string;

    return this.desencriptarToken(item)
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
