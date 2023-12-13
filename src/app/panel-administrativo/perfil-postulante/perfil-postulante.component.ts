import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InfoUsuarioService } from '../../shared/services/info-usuario.service';


@Component({
  selector: 'app-perfil-postulante',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './perfil-postulante.component.html',
  styleUrl: './perfil-postulante.component.scss'
})
export class PerfilPostulanteComponent {
  constructor(
    //private gestionarVacantesService: GestionarVacantesService,
    private infoUsuario: InfoUsuarioService
  ) { }

  form = new FormGroup({
    nombre: new FormControl('', Validators.minLength(1)),
    direccion: new FormControl('', Validators.minLength(1)),
    numero_telefonico: new FormControl(0, Validators.min(1)),
    idiomas: new FormControl('', Validators.minLength(1)),
    habilidades: new FormControl('', Validators.minLength(1)),
    intereses: new FormControl('', Validators.minLength(1)),
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
  })

  habilitarBotonGuardarCambios = true;

  guardarPerfilPostulante() {
    console.log(this.form.valid)
    console.log(this.form.value)
  }
}
