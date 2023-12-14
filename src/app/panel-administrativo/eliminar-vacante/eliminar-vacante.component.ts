import { Component, OnInit } from '@angular/core';
import { DatosVacante } from '../../shared/dtos/gesionar-vacantes.dtos';
import { firstValueFrom } from 'rxjs';
import { GestionarVacantesService } from '../../shared/services/gestionar-vacantes.service';
import { VacanteCardComponent } from '../../shared/components/vacante-card/vacante-card.component';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-eliminar-vacante',
  standalone: true,
  imports: [VacanteCardComponent],
  templateUrl: './eliminar-vacante.component.html',
  styleUrl: './eliminar-vacante.component.scss',
})
export class EliminarVacanteComponent implements OnInit {
  constructor(private gestionVacantes: GestionarVacantesService) {}

  vacantes_publicadas: DatosVacante[] = [];
  id_vacante_seleccionada!: number;
  modal_eliminar_vacante!: Modal;

  async ngOnInit() {
    await this.obtenerVacantesPublicadas();
    this.definirModalEliminarVacante();
  }

  private async obtenerVacantesPublicadas() {
    this.vacantes_publicadas = await firstValueFrom(this.gestionVacantes.obtenerVacantesPublicadas());
  }

  private definirModalEliminarVacante() {
    const modalHtml = document.querySelector<HTMLElement>('#popup-modal-eliminar-vacante');
    this.modal_eliminar_vacante = new Modal(modalHtml);
  }

  accionesEliminarVacante(id_vacante: number) {
    this.almacenarIdVacanteSeleccionada(id_vacante);
    this.mostrarModalEliminarVacante();
  }

  private almacenarIdVacanteSeleccionada(id_vacante: number) {
    this.id_vacante_seleccionada = id_vacante;
  }

  private mostrarModalEliminarVacante() {
    this.modal_eliminar_vacante.show();
  }

  async onConfirmarEliminarVacante() {
    this.modal_eliminar_vacante.hide();
    await firstValueFrom(this.gestionVacantes.eliminarVacante(this.id_vacante_seleccionada));
    await this.obtenerVacantesPublicadas();
  }

  onCancelarEliminarVacante() {
    this.modal_eliminar_vacante.hide();
  }
}
