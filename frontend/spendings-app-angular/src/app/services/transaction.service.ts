import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../common/transaction';
import { Observable, map, tap } from 'rxjs';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = 'https://spendingsapp-backend-production.up.railway.app/category/';

  transactions: Transaction[] = [];

  constructor(private httpClient: HttpClient) { }

  addTransaction(transaction: Transaction, category: Category) {
    return this.httpClient.post<any>(this.baseUrl + category.id + "/transaction/add", transaction, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response.status == 200) {
            console.log("Transaction added.")
          }
        })
      )
  }

  listYearMonthTransactions(year: number, monthIndex: number, categoryId: number): Observable<Transaction[]> {
    let month = monthIndex < 9 ? "0" + (monthIndex + 1) : monthIndex + 1;
    return this.httpClient.get<Transaction[]>(this.baseUrl + categoryId + "/transaction/all/" + year + "-" + month).pipe(
      map(response => response)
    )
  }

  deleteTransaction(transaction: Transaction, categoryId: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete<any>(this.baseUrl + categoryId + "/transaction/" + transaction.id, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response.status == 204) {
            const itemIndex = this.transactions.findIndex(temp => temp.id == transaction.id);
            if (itemIndex > -1) {
              this.transactions.splice(itemIndex, 1);
            }
          }
        })
      )
  }

}
