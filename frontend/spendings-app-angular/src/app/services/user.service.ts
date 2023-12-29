import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User } from '../common/user';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginUrl = 'https://spendingsapp-backend-production.up.railway.app/authenticate';
  private registerUrl = 'https://spendingsapp-backend-production.up.railway.app/user/register';
  private baseUrl = 'https://spendingsapp-backend-production.up.railway.app/user';
  public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();


  constructor(private httpClient: HttpClient) {
    this.isLoggedInSubject.next(false);
    this.checkToken();
  }

  register(user: User): Observable<any> {
    return this.httpClient.post<any>(this.registerUrl, user, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response.status === 200) {
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An unknown error occurred';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  login(user: User): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.loginUrl, user, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response.status === 200) {
            this.isLoggedInSubject.next(true);
          }
        }),
        catchError(error => {
          let errorMessage = 'Username or password invalid. Try again.';
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  checkToken() {
    return this.httpClient.get<any>(this.baseUrl + '/checkToken', { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.isLoggedInSubject.next(true);
          } else {
            this.isLoggedInSubject.next(false);
          }
        })
      );
  }

  getTotalSpendings(): Observable<number> {
    return this.httpClient.get<number>(this.baseUrl + "/totalSpendings").pipe(
      map(response => response)
    )
  }

  getTotalMonthSpendings(year: number, monthIndex: number): Observable<number> {
    let month = monthIndex < 9 ? "0" + (monthIndex + 1) : monthIndex + 1;
    return this.httpClient.get<number>(this.baseUrl + "/totalSpendings/" + year + "-" + month).pipe(
      map(response => response)
    )
  }

  getTotalIncome(): Observable<number> {
    return this.httpClient.get<number>(this.baseUrl + "/totalIncome").pipe(
      map(response => response)
    )
  }

  getTotalMonthIncome(year: number, monthIndex: number): Observable<number> {
    let month = monthIndex < 9 ? "0" + (monthIndex + 1) : monthIndex + 1;
    return this.httpClient.get<number>(this.baseUrl + "/totalIncome/" + year + "-" + month).pipe(
      map(response => response)
    )
  }

  getBalance(): Observable<number> {
    return this.httpClient.get<number>(this.baseUrl + "/balance").pipe(
      map(response => response)
    )
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
