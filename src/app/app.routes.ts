import { Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthRoutingModule,
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
