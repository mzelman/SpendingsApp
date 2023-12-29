import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Category } from '../common/category';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'https://spendingsapp-backend-production.up.railway.app/category/';
  private totalsUrl = 'https://spendingsapp-backend-production.up.railway.app/user/category/';

  categories: Category[] = [];
  categoriesToSend: Subject<Category[]> = new BehaviorSubject<Category[]>([]);

  constructor(private httpClient: HttpClient) { }

  getCategoriesList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl + "all").pipe(
      map(response => response)
    )
  }

  addCategory(category: Category) {
    return this.httpClient.post<any>(this.baseUrl + "add", category, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response.status == 200) {
            category.total = 0;
            this.categories.push(category);
            this.categoriesToSend.next(this.categories);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An unknown error occurred';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          return throwError(() => new Error(errorMessage));
        })
      )
  }

  deleteCategory(category: Category): Observable<HttpResponse<any>> {
    return this.httpClient.delete<any>(this.baseUrl + category.id, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response.status == 204) {
            const itemIndex = this.categories.findIndex(temp => temp.id == category.id);
            if (itemIndex > -1) {
              this.categories.splice(itemIndex, 1);
              this.categoriesToSend.next(this.categories);
            }
          }
        })
      )
  }

  updateCategory(category: Category) {
    return this.httpClient.put(this.baseUrl + category.id, category, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response.status == 200) {
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

  calculateTotals(category: Category) {
    return this.httpClient.get<number>(this.baseUrl + category.id + "/transaction/total")
      .pipe(
        map(response =>
          category.total = response
        )
      );
  }

  calculateMonthTotals(category: Category, year: number, monthIndex: number) {
    let month = monthIndex < 9 ? "0" + (monthIndex + 1) : monthIndex + 1;
    return this.httpClient.get<number>(this.totalsUrl + category.id + "/total/" + year + "-" + month)
      .pipe(
        map(response =>
          category.total = response
        ));
  }

}