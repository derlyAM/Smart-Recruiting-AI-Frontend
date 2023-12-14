import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { GestionarVacantesComponent } from './gestionar-vacantes/gestionar-vacantes.component';
import { VacantesRecomendadasComponent } from './vacantes-recomendadas/vacantes-recomendadas.component';
import { EliminarVacanteComponent } from './eliminar-vacante/eliminar-vacante.component';
import { CrearEditarVacanteComponent } from './crear-editar-vacante/crear-editar-vacante.component';
import { EditarVacanteComponent } from './editar-vacante/editar-vacante.component';
import { VacantesFiltradasComponent } from './vacantes-filtradas/vacantes-filtradas.component';
import { PostularVacantesComponent } from './postular-vacantes/postular-vacantes.component';


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
    path: 'vacante',
    component: CrearEditarVacanteComponent,
  },
  {
    path: 'eliminar-vacante',
    component: EliminarVacanteComponent,
  },
  {
    path: 'editar-vacante',
    component: EditarVacanteComponent,
  },
  {
    path: 'vacante/:id',
    component: CrearEditarVacanteComponent,
  },
  {
    path: 'vacantes-recomendadas',
    component: VacantesRecomendadasComponent,
  },
  {
    path: 'vacantes-filtradas',
    component: VacantesFiltradasComponent,
  },
  {
    path: 'postular-vacantes/:id',
    component: PostularVacantesComponent,
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
