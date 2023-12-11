import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';
import { CorsInterceptor } from './cors.interceptor';
import { DireccionServidorInterceptor } from './direccion-servidor.interceptor';

export const customHttpInterceptors: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DireccionServidorInterceptor, multi: true },
];
