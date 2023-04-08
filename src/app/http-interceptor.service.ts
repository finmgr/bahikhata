import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Your interceptor logic goes here
    const authReq = request.clone({
      headers: request.headers
      .set('Authorization', 'Bearer '+localStorage.getItem('session-id'))
      .set('d', ''+localStorage.getItem('d-token') )
      .set('dl', ''+localStorage.getItem('all-d-token'))

    });
    return next.handle(authReq);
  }

}
