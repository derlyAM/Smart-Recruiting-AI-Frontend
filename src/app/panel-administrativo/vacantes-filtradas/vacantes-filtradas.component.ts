import { Component, OnInit } from '@angular/core';
import { FiltrosVacante, DatosVacante } from '../../shared/dtos/gesionar-vacantes.dtos';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GestionarVacantesService } from '../../shared/services/gestionar-vacantes.service';
import { firstValueFrom } from 'rxjs';
import { VacanteCardComponent } from '../../shared/components/vacante-card/vacante-card.component';
import { InfoUsuarioService } from '../../shared/services/info-usuario.service';
import { UbicacionService } from '../../shared/services/ubicacion.service';
import { Ubicacion } from '../../shared/dtos/ubicacion.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vacantes-filtradas',
  standalone: true,
  imports: [ReactiveFormsModule,VacanteCardComponent, FormsModule],
  templateUrl: './vacantes-filtradas.component.html',
  styleUrl: './vacantes-filtradas.component.scss'
})
export class VacantesFiltradasComponent {
  constructor(
    private gestionVacantes: GestionarVacantesService, 
    private gestionarVacantesService: GestionarVacantesService,
    private route: ActivatedRoute,
    private infoUsuario: InfoUsuarioService,
    private ubicacion: UbicacionService,
    ) {}

  vacantes_filtradas: DatosVacante[] = [];
  ubicaciones: Ubicacion[] = [];
  estados: string[] = [];
  estadoSeleccionado = '';
  ciudadesDelEstadoSeleccinado: string[] = [];
  ciudadSeleccionada = '';
  habilitarBotonObtenerVacantesFiltradas = true;

  form = new FormGroup({
    titulo: new FormControl('', [Validators.minLength(0)]),
    fecha_publicacion: new FormControl('', [Validators.minLength(0)]),
    fecha_cierre: new FormControl('', [Validators.minLength(0)]),
    salario: new FormControl(0, [Validators.min(0)]),
    remoto: new FormControl(),
    modalidad: new FormControl('', [Validators.minLength(0)]),
    area_trabajo: new FormControl('', [Validators.minLength(0)]),
    annos_experiencia: new FormControl(0, [Validators.min(0)]),
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


  async buscarVacante() {
    const vacante: FiltrosVacante = {
      titulo: this.form.get('titulo')?.value || '',
      fecha_publicacion: this.form.get('fecha_publicacion')?.value || '',
      fecha_cierre: this.form.get('fecha_cierre')?.value || '',
      salario: this.form.get('salario')?.value || 0,
      remoto: this.form.get('remoto')?.value,
      modalidad: this.form.get('modalidad')?.value || '',
      ubicacion: this.obtenerUbicacionDadoEstadoYCiudad(),
      area_trabajo: this.form.get('area_trabajo')?.value || '',
      annos_experiencia: this.form.get('annos_experiencia')?.value || 0,
    };

    try {
      //this.habilitarBotonObtenerVacantesFiltradas = false;
    console.log(vacante);

      this.vacantes_filtradas = await firstValueFrom(this.gestionarVacantesService.filtrarVacante(vacante))
    } catch (error) {
      console.error(error);
    } finally {
      //this.habilitarBotonObtenerVacantesFiltradas = true;
    }
  }

  /**
   * 
   * @param vacante 
   * 
  private async filtrarVacanteEnServidor(vacante: FiltrosVacante) {
    const observable = this.gestionarVacantesService.obtenerVacante(vacante.id);
  
    observable.pipe(toArray()).subscribe(
      (valores: any[]) => {
        // Hacer algo con todos los valores emitidos
        console.log(valores);
        alert('Vacantes encontradas exitosamente');
      }
    );
  }
   */
  
}

