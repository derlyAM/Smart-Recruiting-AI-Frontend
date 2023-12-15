import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterDto } from '../login/login.dtos';
import { RegisterService } from '../register/register.service'
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  register_form = new FormGroup({
    names: new FormControl('', [Validators.required]),
    surnames: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
    passwd: new FormControl('', [Validators.required, Validators.minLength(5)]),
    rol: new FormControl('', [Validators.required])
  });

  async registrarse() {
    if (this.register_form.invalid) {
      console.log("Invalido");
      return;
    }

    const registerDto: RegisterDto = {
      names: this.register_form.get('names')?.value || '',
      surnames: this.register_form.get('surnames')?.value || '',
      correo: this.register_form.get('correo')?.value || '',
      passwd: this.register_form.get('passwd')?.value || '',
      rol_id: Number(this.register_form.get('rol')?.value) || 0,
    };


    try {
      await firstValueFrom(this.registerService.registrarse(registerDto));

    } catch (error) {
      console.error(error);
    }
  }

  redirigirALogin() {
    this.router.navigate(['auth/login'], { relativeTo: this.route });
  }

}
