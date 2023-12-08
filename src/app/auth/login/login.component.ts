import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDto } from './login.dtos';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}

  form = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
    passwd: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  iniciarSesion() {
    if (this.form.invalid) {
      return;
    }

    const loginDto: LoginDto = {
      correo: this.form.get('correo')?.value || '',
      passwd: this.form.get('passwd')?.value || '',
    };

    this.loginService.iniciarSesion(loginDto).subscribe({
      next: (token) => {
        this.loginService.guardarToken(token);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
