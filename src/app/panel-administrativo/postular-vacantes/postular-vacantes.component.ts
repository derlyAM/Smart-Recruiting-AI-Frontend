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
    private ubicacion: UbicacionService,
    private route: ActivatedRoute
  ) {}

  ubicaciones: Ubicacion[] = [];
  estados: string[] = [];
  estadoSeleccionado = '';
  ciudadesDelEstadoSeleccinado: string[] = [];
  ciudadSeleccionada = '';

  habilitarBotonPostularVacante = false;

  form = new FormGroup({
    titulo: new FormControl('', [Validators.minLength(5)]),
    descripcion: new FormControl('', [Validators.minLength(1)]),
    fecha_publicacion: new FormControl('', [Validators.minLength(1)]),
    fecha_cierre: new FormControl('', [Validators.minLength(1)]),
    salario: new FormControl(0, [Validators.min(1)]),
    remoto: new FormControl(),
    modalidad: new FormControl('', [Validators.minLength(1)]),
    ubicacion: new FormControl('', [Validators.minLength(1)]),
    area_trabajo: new FormControl('', [Validators.minLength(1)]),
    annos_experiencia: new FormControl(0, [Validators.min(1)]),
  });

  async ngOnInit() {
      await this.obtenerTodasLasUbicaciones();
      await this.mostrarDatosDeVacante(); // Llama a la función que muestra los datos de la vacante
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

  async mostrarDatosDeVacante() {
    const idVacante = this.obtenerIdVacanteDeLaUrl(); 
    if (!idVacante) {
      console.error('El ID de la vacante no es válido');
      return;
    }
  
    try {  
      const vacanteObtenida$ = this.gestionarVacantesService.obtenerVacante(idVacante);
      vacanteObtenida$.subscribe( async (vacanteObtenida) => {
        if (vacanteObtenida) {
          const vacante: DatosVacante = {
            id: idVacante,
            titulo: vacanteObtenida.titulo,
            descripcion: vacanteObtenida.descripcion,
            fecha_publicacion: vacanteObtenida.fecha_publicacion,
            fecha_cierre: vacanteObtenida.fecha_cierre,
            salario: vacanteObtenida.salario,
            remoto: vacanteObtenida.remoto,
            modalidad: vacanteObtenida.modalidad,
            ubicacion: vacanteObtenida.ubicacion,
            area_trabajo: vacanteObtenida.area_trabajo,
            annos_experiencia: vacanteObtenida.annos_experiencia,
            usuario_reclutador: vacanteObtenida.usuario_reclutador,
          };

          this.form.patchValue({
            titulo: vacanteObtenida.titulo,
            descripcion: vacanteObtenida.descripcion,
            fecha_publicacion: vacanteObtenida.fecha_publicacion,
            fecha_cierre: vacanteObtenida.fecha_cierre,
            salario: vacanteObtenida.salario,
            remoto: vacanteObtenida.remoto,
            modalidad: vacanteObtenida.modalidad,
            ubicacion: await this.obtenerNombreUbicacion(vacanteObtenida.ubicacion),
            area_trabajo: vacanteObtenida.area_trabajo,
            annos_experiencia: vacanteObtenida.annos_experiencia,
          });
        } else {
          console.error('No se pudo obtener la vacante del servidor');
        }
      });
    } catch (error) {
      console.error('Error al obtener la vacante del servidor:', error);
    }finally {
      this.habilitarBotonPostularVacante = true;
    }
  }

  private async obtenerNombreUbicacion(idUbicacion: number) {
    const ubicaciones = await firstValueFrom(this.ubicacion.obtenerUbicaciones());
    const ubicacionVacante = ubicaciones.find(ubicacion => ubicacion.id == idUbicacion);
    return ubicacionVacante?.estado + ' - ' + ubicacionVacante?.ciudad;
  }

  async postularVacante() {
    const idVacante = this.obtenerIdVacanteDeLaUrl(); 
    if (!idVacante) {
      console.error('El ID de la vacante no es válido');
      return;
    }
  
    try {
      this.habilitarBotonPostularVacante = false;
      await this.postularVacanteEnServidor(idVacante)
    } catch (error) {
      console.error(error);
    } finally {
      this.habilitarBotonPostularVacante = true;
    }
  }
  
  private async postularVacanteEnServidor(id: number) {
    await firstValueFrom(this.gestionarVacantesService.postularVacante(id));
    alert('Vacante postulada exitosamente');
  }
}  