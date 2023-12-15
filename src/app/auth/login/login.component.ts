import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDto } from './login.dtos';
import { Router, ActivatedRoute } from '@angular/router';
import { InfoUsuarioService } from '../../shared/services/info-usuario.service';
import { TokenService } from './token.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private infoUsuario: InfoUsuarioService,
    private token: TokenService
  ) {}

  form = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
    passwd: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  async iniciarSesion() {
    if (this.form.invalid) {
      console.log("Invalido");
      return;
    }

    const loginDto: LoginDto = {
      correo: this.form.get('correo')?.value || '',
      passwd: this.form.get('passwd')?.value || '',
    };

    try {
      const token = await firstValueFrom(this.loginService.iniciarSesion(loginDto));
    
      await this.accionesDeInicioDeSesion(token);
    } catch (error) {
      console.error(error);
    }
  }

  private async accionesDeInicioDeSesion(token: string) {
    this.token.guardarToken(token);
    await this.infoUsuario.cargarInfoUsuario();
    this.router.navigate(['/panel-administrativo']);
  }

  redirigirARegistro() {
    this.router.navigate(['/auth/register']);
  }
}
