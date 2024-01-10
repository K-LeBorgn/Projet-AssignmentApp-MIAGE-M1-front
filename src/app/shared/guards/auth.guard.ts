import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  return authService.isAdmin().then((auth) => {
    if (auth) {
      console.log('Vous êtes admin, navigation authorisée !');
      return true;
    } else {
      console.log("Vous n'êtes pas admin ! Navigation refusée !");
      //router.navigate(['/home']);
      return false;
    }
  });
};
