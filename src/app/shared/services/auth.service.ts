import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from "@angular/common/http";
import { LoginResponse } from "../response/loginResponse";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8010/api'
  loggedIn : boolean = false;
  admin : boolean = false;
  userConnected: User | undefined = undefined;
  accessToken: string | undefined = undefined;
  refreshToken: string | undefined = undefined;

  logIn(username: string, password: string) {
    return this.http.post<LoginResponse>(this.url + '/login', { username : username, password : password })
  }

  getNewAccessToken() {
    return this.http.post(this.url + '/updateAccessToken', { refreshToken : this.refreshToken, username : this.userConnected?.username })
  }

  logOut() {
    this.http.post(this.url + '/logout', { refreshToken : this.refreshToken })
    this.loggedIn = false;
    this.admin = false;
    this.userConnected = undefined;
    this.accessToken = undefined;
    this.refreshToken = undefined;
    window.location.reload();
  }

  isLogged(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
  }
}
