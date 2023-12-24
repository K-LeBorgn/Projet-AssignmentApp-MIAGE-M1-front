import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  loggedIn = false;

  userConnected: User | undefined = undefined;

  users: User[] = [
    {
      login: 'admin',
      password: 'admin',
      role: 'admin',
    },
    {
      login: 'user',
      password: 'user',
      role: 'user',
    },
  ];

  logIn(username: string, password: string) {
    if (
      this.users.find((u) => u.login === username && u.password === password)
    ) {
      this.userConnected = this.users.find(
        (u) => u.login === username && u.password === password,
      );
      this.loggedIn = true;
      console.log(this.userConnected);
      console.log(this.loggedIn);
    }
  }

  logOut() {
    console.log('LOGOUT IS LOGGED IN : ', this.loggedIn);
    this.loggedIn = false;
    this.userConnected = undefined;
    console.log('LOGOUT : ', this.loggedIn);
  }

  isAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(this.userConnected?.role === 'admin');
    });
  }

  isLogged(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
  }
}
