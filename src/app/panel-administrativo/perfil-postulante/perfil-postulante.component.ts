import { DatosUsuario } from './../../shared/dtos/usuario-dtos';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InfoUsuarioService } from '../../shared/services/info-usuario.service';
import { firstValueFrom } from 'rxjs';
import { PerfilPostulanteService } from './perfil-postulante.service';
import { EducacionDto, ExperienciaDto, PerfilPostulanteDto } from './perfil-postulante.dtos';

@Component({
  selector: 'app-perfil-postulante',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './perfil-postulante.component.html',
  styleUrl: './perfil-postulante.component.scss',
})
export class PerfilPostulanteComponent implements OnInit {
  constructor(private infoUsuario: InfoUsuarioService, private postulanteService: PerfilPostulanteService) {}

  form = new FormGroup({
    nombre: new FormControl('', Validators.minLength(1)),
    idiomas: new FormControl('', Validators.minLength(1)),
    habilidades: new FormControl('', Validators.minLength(1)),
    nombre_empresa: new FormControl('', Validators.minLength(1)),
    contacto: new FormControl('', Validators.minLength(1)),
    tipo_cargo: new FormControl('', Validators.minLength(1)),
    fecha_inicio: new FormControl('', Validators.minLength(1)),
    fecha_finalizacion: new FormControl('', Validators.minLength(1)),
    responsabilidades: new FormControl('', Validators.minLength(1)),
    titulo_obtenido: new FormControl('', Validators.minLength(1)),
    institucion: new FormControl('', Validators.minLength(1)),
    area_de_estudio: new FormControl('', Validators.minLength(1)),
    fecha_inicio_estudio: new FormControl('', Validators.minLength(1)),
    fecha_finalizacion_estudio: new FormControl('', Validators.minLength(1)),
    promedio_ponderado: new FormControl(0, Validators.min(1)),
    reconocimientos: new FormControl('', Validators.minLength(1)),
  });

  habilitarBotonGuardarCambios = true;
  usuario!: DatosUsuario;
  perfil_postulante!: PerfilPostulanteDto;
  experiencia!: ExperienciaDto;
  educacion!: EducacionDto;

  async ngOnInit() {
    await this.cargarTodosLosDatosDelPostulante();
  }

  private async cargarTodosLosDatosDelPostulante() {
    await this.obtenerNombreUsuario();
    await this.obtenerDatosPostulante();
    await this.obtenerDatosExperiencia();
    await this.obtenerDatosEducacion();
  }

  private async obtenerNombreUsuario() {
    this.usuario = await firstValueFrom(this.infoUsuario.obtenerUsuarioDeBaseDeDatos());
    this.form.get('nombre')?.setValue(this.usuario.nombres);
  }

  private async obtenerDatosPostulante() {
    this.perfil_postulante = await firstValueFrom(this.postulanteService.obtenerPerfilPostulante());
    this.form.get('habilidades')?.setValue(this.perfil_postulante.habilidades);
    this.form.get('idiomas')?.setValue(this.perfil_postulante.idiomas);
  }

  private async obtenerDatosExperiencia() {
    const respuesta = await firstValueFrom(this.postulanteService.obtenerExperienciaPostulante());
    this.experiencia = respuesta[0];
    this.form.get('nombre_empresa')?.setValue(this.experiencia.nombre_empresa);
    this.form.get('contacto')?.setValue(this.experiencia.contacto);
    this.form.get('tipo_cargo')?.setValue(this.experiencia.tipo_cargo);
    this.form.get('fecha_inicio')?.setValue(this.experiencia.fecha_inicio);
    this.form.get('fecha_finalizacion')?.setValue(this.experiencia.fecha_finalizacion);
    this.form.get('responsabilidades')?.setValue(this.experiencia.responsabilidades);
  }

  private async obtenerDatosEducacion() {
    const respuesta = await firstValueFrom(this.postulanteService.obtenerEducacionPostulante());
    this.educacion = respuesta[0];
    this.form.get('titulo_obtenido')?.setValue(this.educacion.titulo_obtenido);
    this.form.get('institucion')?.setValue(this.educacion.institucion);
    this.form.get('area_de_estudio')?.setValue(this.educacion.area_de_estudio);
    this.form.get('fecha_inicio_estudio')?.setValue(this.educacion.fecha_inicio);
    this.form.get('fecha_finalizacion_estudio')?.setValue(this.educacion.fecha_finalizacion);
    this.form.get('promedio_ponderado')?.setValue(this.educacion.promedio_ponderado);
    this.form.get('reconocimientos')?.setValue(this.educacion.reconocimientos);
  }

  async actualizarDatosDelUsurio() {
    try {
      this.habilitarBotonGuardarCambios = false;
      await this.actualizarUsuario();
      await this.actualizarPerfilPostulante();
      await this.actualizarExperienciaPostulante();
      await this.actualizarEducacionPostulante();
      alert('Datos actualizados con éxito');
    } catch (error) {
      alert('Hubo un error al actualizar los datos');
    } finally {
      await this.cargarTodosLosDatosDelPostulante();
      this.habilitarBotonGuardarCambios = true;
    }
  }

  private async actualizarUsuario() {
    this.usuario.nombres = this.form.get('nombre')?.value || '';
    await firstValueFrom(this.infoUsuario.actualizarUsuario(this.usuario));
  }

  private async actualizarPerfilPostulante() {
    this.perfil_postulante.habilidades = this.form.get('habilidades')?.value || '';
    this.perfil_postulante.idiomas = this.form.get('idiomas')?.value || '';
    await firstValueFrom(this.postulanteService.actualizarPerfilPostulante(this.perfil_postulante));
  }

  private async actualizarExperienciaPostulante() {
    this.experiencia.nombre_empresa = this.form.get('nombre_empresa')?.value || '';
    this.experiencia.contacto = this.form.get('contacto')?.value || '';
    this.experiencia.tipo_cargo = this.form.get('tipo_cargo')?.value || '';
    this.experiencia.fecha_inicio = this.form.get('fecha_inicio')?.value || '';
    this.experiencia.fecha_finalizacion = this.form.get('fecha_finalizacion')?.value || '';
    this.experiencia.responsabilidades = this.form.get('responsabilidades')?.value || '';
    await firstValueFrom(this.postulanteService.actualizarExperienciaPostulante(this.experiencia));
  }

  private async actualizarEducacionPostulante() {
    this.educacion.titulo_obtenido = this.form.get('titulo_obtenido')?.value || '';
    this.educacion.institucion = this.form.get('institucion')?.value || '';
    this.educacion.area_de_estudio = this.form.get('area_de_estudio')?.value || '';
    this.educacion.fecha_inicio = this.form.get('fecha_inicio_estudio')?.value || '';
    this.educacion.fecha_finalizacion = this.form.get('fecha_finalizacion_estudio')?.value || '';
    this.educacion.promedio_ponderado = this.form.get('promedio_ponderado')?.value || 0;
    this.educacion.reconocimientos = this.form.get('reconocimientos')?.value || '';
    await firstValueFrom(this.postulanteService.actualizarEducacionPostulante(this.educacion));
  }
}
