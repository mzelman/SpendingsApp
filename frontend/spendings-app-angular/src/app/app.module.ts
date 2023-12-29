import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SpendingsChartComponent } from './components/spendings-chart/spendings-chart.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { CategoryService } from './services/category.service';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { AuthInterceptor } from './http/http-interceptor';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditCategoryDialogComponent } from './components/edit-category-dialog/edit-category-dialog.component';
import { ConfirmDeletionComponent } from './components/confirm-deletion/confirm-deletion.component';
import { EditCategoryNameComponent } from './components/edit-category-name/edit-category-name.component';
import { IncomeDialogComponent } from './components/income-dialog/income-dialog.component';
import { ConfirmTransactionDeletionComponent } from './components/confirm-transaction-deletion/confirm-transaction-deletion.component';
import { AuthGuard } from './http/auth-guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'categories', component: SpendingsChartComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
  { path: 'not-found', component: NotfoundComponent },
  { path: '**', redirectTo: '/not-found' }
]

@NgModule({
  declarations: [
    AppComponent,
    SpendingsChartComponent,
    LoginComponent,
    RegisterComponent,
    LoginStatusComponent,
    CategoryDialogComponent,
    EditCategoryDialogComponent,
    ConfirmDeletionComponent,
    EditCategoryNameComponent,
    IncomeDialogComponent,
    ConfirmTransactionDeletionComponent,
    NotfoundComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [CategoryService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
