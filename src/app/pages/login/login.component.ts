import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(event: any) {
    this.authService.logIn(event.target.username.value, event.target.password.value).subscribe({
      next: (data) => {
        if (data.user) {
          this.authService.setLoggedIn(true);
          this.authService.setUserConnected(data.user);
          this.authService.setAccessToken(data.accessToken);
          this.authService.setRefreshToken(data.refreshToken);
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.log(error);
      },complete: () => {}
    });
  }
}
