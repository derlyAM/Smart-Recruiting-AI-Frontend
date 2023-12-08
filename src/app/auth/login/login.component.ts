import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.iniciarSesion({ correo: 'xshevlan5@shareasale.com', passwd: 'pollito666' }).subscribe({
      next: (token) => {
        console.log(token);
        this.loginService.guardarToken(token);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
