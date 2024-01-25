import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);

  return authService.isLogged().then((auth) => {
    if (auth) {
      return true;
    } else {
      console.log("Vous n'êtes pas connecté ! Navigation refusée !");
      return false;
    }
  });
};
