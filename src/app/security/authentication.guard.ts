import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./authentication.service";
import decode from "jwt-decode"
import {Jwt} from "./jwt";
import {Role} from "./role";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let expectedRole = <Role> route.data["expectedRole"]
    const token = localStorage.getItem("access_token")

    if (!token) {
      this.authenticationService.logout()
      return false
    }
    if (!expectedRole) expectedRole = Role.ROLE_USER

    const payload = <Jwt> decode(token)

    // @ToDO Add 403 redirect page if role is not met
    if (!this.authenticationService.isLoggedIn() ||
        !payload.roles.includes(expectedRole)) {
      this.authenticationService.logout()
      this.router.navigate(['login'])
      return false
    }

    return true
  }
}


