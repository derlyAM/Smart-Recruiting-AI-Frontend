import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  redirigirAPublicarVacante() {
    this.router.navigate(['publicar-vacante'], { relativeTo: this.route });
  }
}
