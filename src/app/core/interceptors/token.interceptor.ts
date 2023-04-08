import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const skipIntercept = request.headers.has('skip');

    if (skipIntercept) {
      request = request.clone({
        headers: request.headers.delete('skip')
      });
    } else {
      const credentials = this.authService.getCredentials();
      const token = (credentials) ? credentials.accessToken : '';

      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }

}
