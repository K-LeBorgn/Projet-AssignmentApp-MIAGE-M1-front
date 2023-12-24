import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  login(event: any) {
    //console.log(event.target.username.value, " / ", event.target.password.value);
    let message =
      event.target.username.value + ' / ' + event.target.password.value;
    this._snackBar.open(message, 'OK');
  }
}
