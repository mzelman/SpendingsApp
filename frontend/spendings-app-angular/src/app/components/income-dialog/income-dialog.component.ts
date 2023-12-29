import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Income } from 'src/app/common/income';
import { IncomeService } from 'src/app/services/income.service';
import { ConfirmTransactionDeletionComponent } from '../confirm-transaction-deletion/confirm-transaction-deletion.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-income-dialog',
  templateUrl: './income-dialog.component.html',
  styleUrls: ['./income-dialog.component.css']
})
export class IncomeDialogComponent implements OnInit {

  incomes: Income[] = [];

  incomeFormGroup!: FormGroup;

  newIncome: Income = new Income(-1, 0, this.data.currentYear, this.data.currentMonthIndex);

  constructor(@Inject(MAT_DIALOG_DATA) public data:
    { totalIncome: number, currentYear: number, currentMonthIndex: number, balance: number },
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<IncomeDialogComponent>,
    private incomeService: IncomeService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.incomeFormGroup = this.formBuilder.group({
      income: new FormControl(this.newIncome.amount, [Validators.required, Validators.min(0.01),
        Validators.pattern(/^\d{1,9}(\.\d{1,2})?$/)])
    });
    this.listIncomes();
  }

  onSaveClick() {
    if (this.incomeFormGroup.valid) {
      this.newIncome.amount = this.incomeFormGroup.get('income')?.value;
      this.incomeService.addIncome(this.newIncome).subscribe(
        () => {
          console.log('Income added successfully');
          this.listIncomes();
          this.incomeFormGroup.reset();
        },
        (error) => {
          console.error('Error adding income:', error);
        }
      );
    }
  }

  public listIncomes() {
    this.incomeService.listYearMonthIncomes(this.data.currentYear, this.data.currentMonthIndex).subscribe((data) => {
      this.incomes = data;
      this.updateTotalIncome();
    });
  }

  public updateTotalIncome() {
    this.userService.getTotalMonthIncome(this.data.currentYear, this.data.currentMonthIndex).subscribe((data) => {
      this.data.totalIncome = data;
    });
  }

  openConfirmDialog(income: Income): void {
    const dialogRef = this.dialog.open(ConfirmTransactionDeletionComponent, {
      width: '300px'
    });
    dialogRef.afterClosed()
      .subscribe((data) => {
        if (data) {
          this.deleteIncome(income);
        } else {
          return;
        }
      })
  }

  public deleteIncome(income: Income) {
    this.incomeService.deleteIncome(income).subscribe(
      () => {
        console.log('Income deleted successfully');
        this.listIncomes();
      },
      (error) => {
        console.error('Error deleting income:', error);
      }
    );
  }

  get amount() {
    return this.incomeFormGroup.get('income');
  }

}
