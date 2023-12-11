import { Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PanelAdministrativoModule } from './panel-administrativo/panel-administrativo.module';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthRoutingModule,
  },
  {
    path: 'panel-administrativo',
    loadChildren: () => PanelAdministrativoModule,
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
