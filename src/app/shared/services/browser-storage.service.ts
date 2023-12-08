import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  guardarItem(key: string, value: string): void {
    localStorage.setItem(key, value);
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
