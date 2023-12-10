import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PublicarVacanteComponent } from './publicar-vacante/publicar-vacante.component';
import { VacantesRecomendadasComponent } from './vacantes-recomendadas/vacantes-recomendadas.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  {
    path: 'publicar-vacante',
    component: PublicarVacanteComponent,
  },
  {
    path: 'vacantes-recomendadas',
    component: VacantesRecomendadasComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelAdministrativoRoutingModule {}
