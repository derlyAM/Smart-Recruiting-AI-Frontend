import { AlmacenamientoNavegadorService } from '../../shared/services/almacenamiento-navegador.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment.prod';
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

  guardarToken(token: string): void {
    this.navegador.guardarItem({
      indice: 'token',
      dato: token,
      tipoDato: 'string',
    });
  }

  encriptarDatos(datos: any): string {
    const encryptedData = CryptoJS.AES.encrypt(datos, environment.secret_key).toString();
    return encryptedData;
  }

  desencriptarDatos(encryptedData: string): any {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, environment.secret_key);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
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
