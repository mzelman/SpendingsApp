import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { IncomeDialogComponent } from '../income-dialog/income-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spendings-chart',
  templateUrl: './spendings-chart.component.html',
  styleUrls: ['./spendings-chart.component.css']
})
export class SpendingsChartComponent implements OnInit {

  categories!: Category[];

  totalSpendings: number = 0;

  totalIncome: number = 0;

  balance: number = 0;

  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  currentDate!: Date;

  currentMonthIndex!: number;

  currentMonthName: string = "";

  currentYear!: number;

  isLoggedIn = false;

  constructor(private categoryService: CategoryService, private dialog: MatDialog,
    private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.currentMonthIndex = this.currentDate.getMonth();
    this.currentMonthName = this.monthNames[this.currentMonthIndex];
    this.currentYear = this.currentDate.getFullYear();

    this.categories = [];
    this.listCategories();
    this.updateData();
  }

  public listCategories() {
    this.categoryService.getCategoriesList().subscribe((data) => {
      this.categories = data;
      for (let cat of this.categories) {
        this.calculateTotals(cat);
      }
    });
  }

  public updateTotalSpendings() {
    this.userService.getTotalMonthSpendings(this.currentYear, this.currentMonthIndex).subscribe((data) => {
      this.totalSpendings = data;
    });
  }

  public updateTotalIncome() {
    this.userService.getTotalMonthIncome(this.currentYear, this.currentMonthIndex).subscribe((data) => {
      this.totalIncome = data;
    });
  }

  public updateBalance() {
    this.userService.getBalance().subscribe((data) => {
      this.balance = data;
    });
  }

  private updateData() {
    this.updateTotalSpendings();
    this.updateTotalIncome();
    this.updateBalance();
  }

  calculateTotals(category: Category) {
    this.categoryService.calculateMonthTotals(category, this.currentYear, this.currentMonthIndex).subscribe(total => {
    });
  }

  public monthRight() {
    if (this.currentMonthIndex == 11) {
      this.currentMonthIndex = 0
      this.currentYear++;
    } else {
      this.currentMonthIndex++;
    }
    this.currentMonthName = this.monthNames[this.currentMonthIndex];
    for (let cat of this.categories) {
      this.calculateTotals(cat);
    }
    this.updateData();
  }

  public monthLeft() {
    if (this.currentMonthIndex == 0) {
      this.currentMonthIndex = 11;
      this.currentYear--;
    } else {
      this.currentMonthIndex--;
    }
    this.currentMonthName = this.monthNames[this.currentMonthIndex];
    for (let cat of this.categories) {
      this.calculateTotals(cat);
    }
    this.updateData();
  }

  openCategoryDialog(category: Category) {
    let dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '300px',
      data: {
        category: category,
        currentMonthIndex: this.currentMonthIndex,
        currentYear: this.currentYear
      }
    });
    dialogRef.afterClosed()
      .subscribe((data) => {
        this.updateData();
        if (data) {
          this.listCategories();
        }
      })
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '300px'
    });
    dialogRef.afterClosed()
      .subscribe((data) => {
        if (data)
          this.listCategories();
      })
  }

  openIncomeDialog(): void {
    const dialogRef = this.dialog.open(IncomeDialogComponent, {
      width: '300px',
      data: {
        totalIncome: this.totalIncome,
        currentMonthIndex: this.currentMonthIndex,
        currentYear: this.currentYear,
        balance: this.balance
      }
    });
    dialogRef.afterClosed()
      .subscribe((data) => {
        this.updateTotalIncome();
        this.updateBalance();
      })
  }

}