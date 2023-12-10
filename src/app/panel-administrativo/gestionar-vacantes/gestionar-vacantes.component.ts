import { Component } from '@angular/core';
import { VacanteCardComponent } from '../../shared/components/vacante-card/vacante-card.component';

@Component({
  selector: 'app-publicar-vacante',
  standalone: true,
  imports: [VacanteCardComponent],
  templateUrl: './gestionar-vacantes.component.html',
  styleUrl: './gestionar-vacantes.component.scss',
})
export class GestionarVacantesComponent {}
