import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from "@angular/common/http";
import { LoginResponse } from "../response/loginResponse";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8010/api'
  loggedIn = false;
  userConnected: User | undefined = undefined;
  accessToken: string | undefined = undefined;
  refreshToken: string | undefined = undefined;

  getAccessToken() {
    return this.accessToken;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  getUserConnected() {
    return this.userConnected;
  }

  setUserConnected(user: User) {
    this.userConnected = user;
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }

  logIn(username: string, password: string) {
    return this.http.post<LoginResponse>(this.url + '/login', { username : username, password : password })
  }

  getNewAccessToken() {
    return this.http.post(this.url + '/updateAccessToken', { refreshToken : this.refreshToken, username : this.userConnected?.username })
  }

  logOut() {
    this.http.post(this.url + '/logout', { refreshToken : this.refreshToken })
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
