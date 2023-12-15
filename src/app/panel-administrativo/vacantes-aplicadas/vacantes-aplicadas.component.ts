import { Component, OnInit } from '@angular/core';
import { VacanteCardComponent } from '../../shared/components/vacante-card/vacante-card.component';
import { DatosVacante } from '../../shared/dtos/gesionar-vacantes.dtos';
import { GestionarVacantesService } from '../../shared/services/gestionar-vacantes.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-vacantes-aplicadas',
  standalone: true,
  imports: [VacanteCardComponent, ],
  templateUrl: './vacantes-aplicadas.component.html',
  styleUrl: './vacantes-aplicadas.component.scss'
})
export class VacantesAplicadasComponent implements OnInit{
    constructor(
      private gestionVacantes: GestionarVacantesService,
    ){}

    vacantes_aplicadas: DatosVacante[] = [];

    async ngOnInit(){
      this.vacantes_aplicadas = await firstValueFrom(this.gestionVacantes.obtenerVacantesAplicadas());
    }
}
