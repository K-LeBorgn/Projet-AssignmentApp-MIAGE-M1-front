import {Component} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'projet-assignments-front';
  loginFormGroup : FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(public authService: AuthService, private _snackBar: MatSnackBar) {}

  login() {
    this.authService.logIn(this.loginFormGroup.value.username, this.loginFormGroup.value.password).subscribe({
      next: (data) => {
        if (data.user) {
          this.authService.loggedIn = true;
          this.authService.admin = data.user.role === 'admin';
          this.authService.userConnected = data.user;
          this.authService.accessToken = data.accessToken;
          this.authService.refreshToken = data.refreshToken;
          this.loginFormGroup.reset();
          this._snackBar.open('Connexion réussie', '',{
            duration: 2000,
          });
        }
      },
      error: (error) => {
        console.log(error);
        this._snackBar.open(error.error.message, '',{
          duration: 2000,
        });
      }, complete: () => {
      }
    });
  }
}
