import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept( request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getUserData()?.accessToken;
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          'X-Authorization': accessToken,
        }
      });
    }

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });

    return next.handle(request);
  }
}
