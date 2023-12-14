import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(private location: Location){}
  get mostrar_nav_bar(){
    const rutas = ['/panel-administrativo','/auth/login', '/auth/register']
    const rutaActual = this.location.path()
    return !rutas.includes(rutaActual)
  }
  regresar(){
    this.location.back()
  }
}
