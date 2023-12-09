import { Component } from '@angular/core';
import { VacanteCardComponent } from '../../shared/components/vacante-card/vacante-card.component';

@Component({
  selector: 'app-publicar-vacante',
  standalone: true,
  imports: [VacanteCardComponent],
  templateUrl: './publicar-vacante.component.html',
  styleUrl: './publicar-vacante.component.scss',
})
export class PublicarVacanteComponent {}
