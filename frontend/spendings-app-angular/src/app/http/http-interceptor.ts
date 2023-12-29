import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('https://spendingsapp-backend-production.up.railway.app/user/register')) {
      return next.handle(req);
    }
    req = req.clone({
      setHeaders: {
        'Authorization': `${localStorage.getItem('token')}`,
      },
    });
    return next.handle(req).pipe(
      tap(() => { }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 403) {
            return;
          }
          this.router.navigateByUrl("/login")
        }
      })
    )
  }
}
