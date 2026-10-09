import { Component } from '@angular/core';
import { Login } from '../../forms/login/login';
import { Register } from '../../forms/register/register';
import { AuthService } from '../../../services/userservices/auth.service';

@Component({
  selector: 'app-sign',
  imports: [Login, Register],
  templateUrl: './sign.html',
  styleUrl: './sign.css',
})
export class Sign {
  mode: string = 'login';

  switchMode(mode: string) {
    this.mode = mode;
  }

}
