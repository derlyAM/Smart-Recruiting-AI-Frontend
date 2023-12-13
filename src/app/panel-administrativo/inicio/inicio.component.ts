import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../auth/login/login.service';
import { InfoUsuarioService } from '../../shared/services/info-usuario.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private login: LoginService,
    private infoUsuario: InfoUsuarioService
  ) {}

  usuarioEsReclutador = false;
  nombreUsuario = '';

  ngOnInit(): void {
    this.usuarioEsReclutador = this.infoUsuario.usuarioEsReclutador();
    this.nombreUsuario = this.infoUsuario.obtenerNombreUsuario();
  }

  cerrarSesion() {
    this.login.cerrarSesion();
  }

  redirigirAGestionarVacantes() {
    this.router.navigate(['gestionar-vacantes'], { relativeTo: this.route });
  }
  
  redirigirAEditarPerfil() {
    this.router.navigate(['perfil-postulante'], { relativeTo: this.route });
  }
}
