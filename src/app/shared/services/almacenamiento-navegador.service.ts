import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlmacenamientoNavegadorService {
  guardarItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removerItem(key: string): void {
    localStorage.removeItem(key);
  }

  obtenerItem(key: string): string {
    const item = localStorage.getItem(key);
    if (item) {
      return item;
    } else {
      throw new Error('No existe el item');
    }
  }
}
