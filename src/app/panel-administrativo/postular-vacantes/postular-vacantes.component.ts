import { Component, OnInit } from '@angular/core';
import { DatosVacante } from '../../shared/dtos/gesionar-vacantes.dtos';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GestionarVacantesService } from '../../shared/services/gestionar-vacantes.service';
import { firstValueFrom } from 'rxjs';
import { InfoUsuarioService } from '../../shared/services/info-usuario.service';
import { UbicacionService } from '../../shared/services/ubicacion.service';
import { Ubicacion } from '../../shared/dtos/ubicacion.dto';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-postular-vacantes',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './postular-vacantes.component.html',
  styleUrl: './postular-vacantes.component.scss'
})
export class PostularVacantesComponent {
  constructor(
    private gestionarVacantesService: GestionarVacantesService,
    private infoUsuario: InfoUsuarioService,
    private ubicacion: UbicacionService,
    private route: ActivatedRoute
  ) {}

  ubicaciones: Ubicacion[] = [];
  estados: string[] = [];
  estadoSeleccionado = '';
  ciudadesDelEstadoSeleccinado: string[] = [];
  ciudadSeleccionada = '';

  habilitarBotonPostularVacante = true;

  form = new FormGroup({
    titulo: new FormControl('', [Validators.minLength(5)]),
    descripcion: new FormControl('', [Validators.minLength(1)]),
    fecha_publicacion: new FormControl('', [Validators.minLength(1)]),
    fecha_cierre: new FormControl('', [Validators.minLength(1)]),
    salario: new FormControl(0, [Validators.min(1)]),
    remoto: new FormControl(),
    modalidad: new FormControl('', [Validators.minLength(1)]),
    area_trabajo: new FormControl('', [Validators.minLength(1)]),
    annos_experiencia: new FormControl(0, [Validators.min(1)]),
  });

  async ngOnInit() {
    await this.obtenerTodasLasUbicaciones();
  }

  async obtenerTodasLasUbicaciones() {
    this.ubicaciones = await firstValueFrom(this.ubicacion.obtenerUbicaciones());
    this.estados = obtenerEstadosSinRepetir(this.ubicaciones);

    function obtenerEstadosSinRepetir(ubicaciones: Ubicacion[]): string[] {
      const estados = new Set<string>();
      ubicaciones.forEach((ubicacion) => estados.add(ubicacion.estado));
      return Array.from(estados);
    }
  }
  cargarCiudadesDelEstadoSeleccionado() {
    if (!this.estadoSeleccionado) {
      return;
    }
    this.ciudadesDelEstadoSeleccinado = this.ubicaciones
      .filter((ubicacion) => ubicacion.estado === this.estadoSeleccionado)
      .map((ubicacion) => ubicacion.ciudad);
  }
  obtenerUbicacionDadoEstadoYCiudad(): number {
    if (!this.estadoSeleccionado || !this.ciudadSeleccionada) {
      return 0;
    }
    return (
      this.ubicaciones.find(
        (ubicacion) => ubicacion.estado === this.estadoSeleccionado && ubicacion.ciudad === this.ciudadSeleccionada
      )?.id || 0
    );
  }

  private obtenerIdVacanteDeLaUrl(): number | null {
    const idVacante = this.route.snapshot.paramMap.get('id');
    if (idVacante) {
      return parseInt(idVacante, 10);
    } else {
      return null;
    }
  }

  async postularVacante() {
    const vacante: DatosVacante = {
      id : this.obtenerIdVacanteDeLaUrl() || 0,
      titulo: this.form.get('titulo')?.value || '',
      descripcion: this.form.get('descripcion')?.value || '',
      fecha_publicacion: this.form.get('fecha_publicacion')?.value || '',
      fecha_cierre: this.form.get('fecha_cierre')?.value || '',
      salario: this.form.get('salario')?.value || 0,
      remoto: this.form.get('remoto')?.value,
      modalidad: this.form.get('modalidad')?.value || '',
      ubicacion: this.obtenerUbicacionDadoEstadoYCiudad(),
      area_trabajo: this.form.get('area_trabajo')?.value || '',
      annos_experiencia: this.form.get('annos_experiencia')?.value || 0,
      usuario_reclutador: this.infoUsuario.obtenerInfoUsuario().id,
    };

    try {
      this.habilitarBotonPostularVacante = false;
      await this.postularVacanteEnServidor(vacante);
    } catch (error) {
      console.error(error);
    } finally {
      this.habilitarBotonPostularVacante = true;
    }
  }

  private async postularVacanteEnServidor(vacante: DatosVacante) {
    const idVacante = vacante.id;
    await firstValueFrom(this.gestionarVacantesService.postularVacante(idVacante));
    alert('Vacante postulada exitosamente');
  }
}
