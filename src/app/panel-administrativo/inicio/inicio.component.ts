import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../auth/login/login.service';
import { InfoUsuarioService } from '../../shared/services/info-usuario.service';
import { HojaDeVidaService } from '../../shared/services/hoja-de-vida.service';
import { ArchivoService } from '../../shared/services/archivo.service';
import { firstValueFrom } from 'rxjs';

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
    private infoUsuario: InfoUsuarioService,
    private hojaDeVidaService: HojaDeVidaService,
    private archivoService: ArchivoService
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

  async descargarHojaDeVida() {
    try {
      await this.accionesParaDescargarHojaDeVida();
    } catch (error) {
      console.error(error);
      alert('Error al descargar hoja de vida');
    }
  }

  private async accionesParaDescargarHojaDeVida() {
    const archivoBase64 = await firstValueFrom(this.hojaDeVidaService.obtenerHojaDeVidaEnFormatoBase64());
    this.archivoService.descargarArchivoDesdeBase64(archivoBase64, 'hoja-de-vida.pdf');
  }

  redirigirAGestionarVacantes() {
    this.router.navigate(['gestionar-vacantes'], { relativeTo: this.route });
  }
  
  redirigirAEditarPerfil() {
    this.router.navigate(['perfil-postulante'], { relativeTo: this.route });
  }

  redirigirRecomendacionIA() {
    this.router.navigate(['vacantes-recomendadas'], { relativeTo: this.route });
  }
}
