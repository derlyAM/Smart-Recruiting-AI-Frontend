import { Component } from '@angular/core';
import { GestionarVacantesService } from '../../shared/services/gestionar-vacantes.service';
import { DatosVacante } from '../../shared/dtos/gesionar-vacantes.dtos';
import { firstValueFrom } from 'rxjs';
import { VacanteCardComponent } from '../../shared/components/vacante-card/vacante-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-vacante',
  standalone: true,
  imports: [VacanteCardComponent],
  templateUrl: './editar-vacante.component.html',
  styleUrl: './editar-vacante.component.scss',
})
export class EditarVacanteComponent {
  constructor(private gestionVacantes: GestionarVacantesService, private router: Router) {}

  vacantes_publicadas: DatosVacante[] = [];

  async ngOnInit() {
    await this.obtenerVacantesPublicadas();
  }

  private async obtenerVacantesPublicadas() {
    this.vacantes_publicadas = await firstValueFrom(this.gestionVacantes.obtenerVacantesPublicadas());
  }

  accionesEditarVacante(id_vacante: number) {
    this.router.navigate(['/panel-administrativo/vacante/' + id_vacante]);
  }
}
