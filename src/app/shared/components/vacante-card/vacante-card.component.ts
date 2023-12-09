import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vacante-card',
  standalone: true,
  imports: [],
  templateUrl: './vacante-card.component.html',
  styleUrl: './vacante-card.component.scss',
})
export class VacanteCardComponent {
  @Input()
  titulo: string = 'Titulo de la vacante';

  @Input()
  descripcion: string = 'Descripcion de la vacante';
}
