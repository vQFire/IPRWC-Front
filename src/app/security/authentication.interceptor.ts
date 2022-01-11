import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const access_token = localStorage.getItem("access_token")

    if (access_token) {
      request = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + access_token)
          .set("Access-Control-Allow-Origin", "*/*")
      });
    }

    request = request.clone({
      headers: request.headers.set("Accept", "*/*")
    })

    return next.handle(request);
  }
}
