import { Injectable } from '@angular/core';
import { Income } from '../common/income';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  incomes: Income[] = [];

  private baseUrl = 'https://spendingsapp-backend-production.up.railway.app/user/income';

  constructor(private httpClient: HttpClient) { }

  addIncome(income: Income) {
    return this.httpClient.post<any>(this.baseUrl + "/add", income, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response.status == 200) {
            console.log("Income added.")
          }
        })
      )
  }

  listYearMonthIncomes(year: number, monthIndex: number): Observable<Income[]> {
    let month = monthIndex < 9 ? "0" + (monthIndex + 1) : monthIndex + 1;
    return this.httpClient.get<Income[]>(this.baseUrl + "/all/" + year + "-" + month).pipe(
      map(response => response)
    )
  }

  deleteIncome(income: Income): Observable<HttpResponse<any>> {
    return this.httpClient.delete<any>(this.baseUrl + "/" + income.id, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response.status == 204) {
            const itemIndex = this.incomes.findIndex(temp => temp.id == income.id);
            if (itemIndex > -1) {
              this.incomes.splice(itemIndex, 1);
            }
          }
        })
      )
  }

}
