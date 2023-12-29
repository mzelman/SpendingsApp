import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, map, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router, private userService : UserService) {}
  
  checkIfLoggedIn(): Observable<boolean> {
    return this.userService.checkToken().pipe(
      switchMap(() => this.userService.isLoggedIn$)
    );
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.checkIfLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true;
        } else {
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
  
}
