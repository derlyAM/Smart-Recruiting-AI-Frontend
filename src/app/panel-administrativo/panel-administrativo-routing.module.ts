import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { GestionarVacantesComponent } from './gestionar-vacantes/gestionar-vacantes.component';
import { VacantesRecomendadasComponent } from './vacantes-recomendadas/vacantes-recomendadas.component';
import { EliminarVacanteComponent } from './eliminar-vacante/eliminar-vacante.component';
import { CrearEditarVacanteComponent } from './crear-editar-vacante/crear-editar-vacante.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  {
    path: 'gestionar-vacantes',
    component: GestionarVacantesComponent,
  },
  {
    path: 'publicar-vacante',
    component: CrearEditarVacanteComponent,
  },
  {
    path: 'eliminar-vacante',
    component: EliminarVacanteComponent,
  },
  {
    path: 'editar-vacante/:id',
    component: CrearEditarVacanteComponent,
  },
  {
    path: 'vacantes-recomendadas',
    component: VacantesRecomendadasComponent,
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
