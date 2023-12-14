import { Injectable } from '@angular/core';

interface DatoLocalStorage {
  indice: string;
  dato: string | object;
  tipoDato: 'string' | 'object';
}

interface IndiceLocalStorage extends Partial<DatoLocalStorage> {
  indice: string;
}

interface ObtenerDatoLocalStorage extends Partial<IndiceLocalStorage> {
  indice: string;
  tipoDato: 'string' | 'object';
}

@Injectable({
  providedIn: 'root',
})
export class AlmacenamientoNavegadorService {



  guardarItem(parametros: DatoLocalStorage): void {
    if (parametros.tipoDato === 'string') {
      localStorage.setItem(parametros.indice, parametros.dato as string);
    } else if (parametros.tipoDato === 'object') {
      localStorage.setItem(parametros.indice, JSON.stringify(parametros.dato));
    }
  }

  removerItem(parametros: IndiceLocalStorage): void {
    localStorage.removeItem(parametros.indice);
  }

  obtenerItem(parametros: ObtenerDatoLocalStorage): string | object {
    if (parametros.tipoDato === 'string') {
      return localStorage.getItem(parametros.indice) as string;
      
    } else if (parametros.tipoDato === 'object') {
      return JSON.parse(localStorage.getItem(parametros.indice) as string);
    }
    return '';
  }

  limpiarAlmacenamiento(): void {
    localStorage.clear();
  }
}
