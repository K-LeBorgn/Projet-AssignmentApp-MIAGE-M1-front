import {Component} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  constructor(public authService: AuthService) {}

  login() {
    this.authService.logIn(this.loginFormGroup.value.username, this.loginFormGroup.value.password).subscribe({
      next: (data) => {
        if (data.user) {
          this.authService.loggedIn = true;
          this.authService.userConnected = data.user;
          this.authService.accessToken = data.accessToken;
          this.authService.refreshToken = data.refreshToken;
          this.loginFormGroup.reset();
        }
      },
      error: (error) => {
        console.log(error);
      }, complete: () => {
      }
    });
  }
}
