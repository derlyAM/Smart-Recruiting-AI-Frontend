import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { VacanteCardComponent } from '../../shared/components/vacante-card/vacante-card.component';
import { RecomendacionVacantesIA } from '../../shared/services/recomendaciones-ia.service';
import { DatosVacante } from '../../shared/dtos/gesionar-vacantes.dtos';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';


@Component({
  selector: 'app-vacantes-recomendadas',
  standalone: true,
  imports: [VacanteCardComponent,NavBarComponent],
  templateUrl: './vacantes-recomendadas.component.html',
  styleUrl: './vacantes-recomendadas.component.scss'
})
export class VacantesRecomendadasComponent implements OnInit {
  constructor(private recomendacionVacantes: RecomendacionVacantesIA, private router: Router) {}

  vacantes_recomendadas: DatosVacante[] = [];

  async ngOnInit() {
    await this.obtenerRecomendacion();
  }

  private async obtenerRecomendacion() {
    this.vacantes_recomendadas = await firstValueFrom(this.recomendacionVacantes.obtenerRecomendacion());
  }

  /*redireccionarAPublicarVacante() {
    this.router.navigate(['/panel-administrativo/publicar-vacante']);
  }*/
}
