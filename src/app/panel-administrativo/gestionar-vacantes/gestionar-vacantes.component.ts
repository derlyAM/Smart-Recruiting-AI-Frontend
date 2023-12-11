import { Component, OnInit } from '@angular/core';
import { VacanteCardComponent } from '../../shared/components/vacante-card/vacante-card.component';
import { GestionarVacantesService } from './gestionar-vacantes.service';
import { firstValueFrom } from 'rxjs';
import { DatosVacante } from './gesionar-vacantes.dtos';

@Component({
  selector: 'app-publicar-vacante',
  standalone: true,
  imports: [VacanteCardComponent],
  templateUrl: './gestionar-vacantes.component.html',
  styleUrl: './gestionar-vacantes.component.scss',
})
export class GestionarVacantesComponent implements OnInit {
  constructor(private gestionVacantes: GestionarVacantesService) {}

  vacantes_publicadas: DatosVacante[] = [];

  async ngOnInit() {
    await this.obtenerVacantesPublicadas();
  }

  private async obtenerVacantesPublicadas() {
    this.vacantes_publicadas = await firstValueFrom(this.gestionVacantes.obtenerVacantesPublicadas());
  }
}
