import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {tap} from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from "./role";
import decode from "jwt-decode";
import {Jwt} from "./jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiURL: String;

  constructor(private http: HttpClient,
              private jwtHelperService: JwtHelperService) {
    this.apiURL = environment.apiURL;
  }

  login (username: string, password: string) {
    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }

    const body = new URLSearchParams();
    body.set("username", username)
    body.set("password", password)

    return this.http.post<LoginResponse>(this.apiURL + "/login", body, options)
      .pipe(tap((result: LoginResponse) => this.setSession(result)))
  }

  private setSession (loginResult: LoginResponse) {
    localStorage.setItem("access_token", loginResult.access_token)
    localStorage.setItem("refresh_token", loginResult.refresh_token)
  }

  logout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
  }

  isLoggedIn (): boolean {
    const token = localStorage.getItem("access_token")

    return token !== null ? !this.jwtHelperService.isTokenExpired(token) : false
  }

  isGranted (role: Role): boolean {
    const token = localStorage.getItem("access_token")

    if (!token) return false

    const payload = <Jwt> decode(token)

    return payload.roles.includes(role)
  }
}

interface LoginResponse {
  access_token: string
  refresh_token: string
}
