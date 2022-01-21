import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, tap} from "rxjs";
import {JwtHelperService} from '@auth0/angular-jwt';
import {Role} from "./role";
import decode from "jwt-decode";
import {Jwt} from "./jwt";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiURL: String;
  public userIsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn())

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
      .pipe(tap((result: LoginResponse) => {
        this.setSession(result)
        this.userIsLoggedIn.next(true)
      }))
  }

  register (user: User) {
    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }

    const body = new URLSearchParams();
    body.set("username", user.username)
    body.set("password", user.password)
    body.set("name", user.name)
    body.set("email", user.email)

    return this.http.post<User>(this.apiURL + "/user/register", body, options)
  }

  profile () {
    return this.http.get<User>(this.apiURL + "/user/profile")
  }

  updateUser (user: User, username: string,  isOwnProfile = false) {
    if (!isOwnProfile) {
      return this.http.put<User>(this.apiURL + "/user/profile/" + username, user)
    }

    return this.http.put<User>(this.apiURL + "/user/profile", user)
  }

  getUsers () {
    return this.http.get<User[]>(this.apiURL + "/user")
  }

  getUser (name: string) {
    return this.http.get<User>(this.apiURL + "/user/" + name)
  }

  private setSession (loginResult: LoginResponse) {
    localStorage.setItem("access_token", loginResult.access_token)
    localStorage.setItem("refresh_token", loginResult.refresh_token)
  }

  logout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")

    this.userIsLoggedIn.next(false)
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

  isModerator (): boolean {
    return this.isGranted(Role.ROLE_MODERATOR);
  }
}

interface LoginResponse {
  access_token: string
  refresh_token: string
}
