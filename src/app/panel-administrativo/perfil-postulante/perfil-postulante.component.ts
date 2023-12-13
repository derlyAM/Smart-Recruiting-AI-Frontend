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
  ) {}

  form = new FormGroup({
    nombre: new FormControl(''),
    direccion: new FormControl(''),
    numero_telefonico: new FormControl(0),
    idiomas: new FormControl(''),
    habilidades: new FormControl(''),
    intereses: new FormControl('')
  })

  habilitarBotonGuardarCambios = true;

}
