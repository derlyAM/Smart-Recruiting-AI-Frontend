import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../auth/login/login.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent {
  constructor(private router: Router, private route: ActivatedRoute, private login: LoginService) {}

  cerrarSesion() {
    this.login.cerrarSesion();
  }

  redirigirAGestionarVacantes() {
    this.router.navigate(['gestionar-vacantes'], { relativeTo: this.route });
  }
}
