import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArchivoService {
  constructor() {}

  descargarArchivoDesdeBase64(archivo: string, nombreArchivo: string) {
    const link = document.createElement('a');
    link.href = 'data:application/octet-stream;base64,' + archivo;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
