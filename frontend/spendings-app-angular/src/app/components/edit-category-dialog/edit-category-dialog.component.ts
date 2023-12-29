import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/common/category';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Transaction } from 'src/app/common/transaction';
import { EditCategoryNameComponent } from '../edit-category-name/edit-category-name.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { ConfirmTransactionDeletionComponent } from '../confirm-transaction-deletion/confirm-transaction-deletion.component';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  categoryFormGroup!: FormGroup;

  transactionFormGroup!: FormGroup;

  transactions: Transaction[] = [];

  newTransaction: Transaction = new Transaction(-1, 0, this.data.category.id, this.data.currentYear, this.data.currentMonthIndex);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { category: Category, currentYear: number, currentMonthIndex: number },
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.calculateTotals(this.data.category);
    this.listTransactions();
    this.transactionFormGroup = this.formBuilder.group({
      transactions: new FormControl(this.newTransaction.amount, [Validators.required, Validators.min(0.01),
        Validators.pattern(/^\d{1,9}(\.\d{1,2})?$/)])
    });
  }

  onSaveClick() {
    if (this.transactionFormGroup.valid) {
      this.newTransaction.amount = this.transactionFormGroup.get('transactions')?.value;
      this.transactionService.addTransaction(this.newTransaction, this.data.category).subscribe(
        () => {
          console.log('Transaction added successfully');
          this.listTransactions();
          this.transactionFormGroup.reset();
        },
        (error) => {
          console.error('Error adding transaction:', error);
        }
      );
    }
  }

  calculateTotals(category: Category) {
    this.categoryService.calculateMonthTotals(category, this.data.currentYear, this.data.currentMonthIndex).subscribe(total => {
      this.data.category.total = total;
    });
  }

  public listTransactions() {
    this.transactionService.listYearMonthTransactions(this.data.currentYear, this.data.currentMonthIndex, this.data.category.id)
      .subscribe((data) => {
        this.transactions = data;
        this.calculateTotals(this.data.category);
      });
  }

  openConfirmDialog(transaction: Transaction): void {
    const dialogRef = this.dialog.open(ConfirmTransactionDeletionComponent, {
      width: '300px'
    });
    dialogRef.afterClosed()
      .subscribe((data) => {
        if (data) {
          this.deleteTransaction(transaction);
        } else {
          return;
        }
      })
  }

  public deleteTransaction(transaction: Transaction) {
    this.transactionService.deleteTransaction(transaction, this.data.category.id).subscribe(
      () => {
        console.log('Transaction deleted successfully');
        this.listTransactions();
      },
      (error) => {
        console.error('Error deleting income:', error);
      }
    );
  }

  onSaveNameClick() {
    if (this.categoryFormGroup.valid) {
      this.data.category.name = this.categoryFormGroup.get('name')?.value;
      this.categoryService.updateCategory(this.data.category).subscribe(
        () => {
          console.log('Category updated successfully');
        },
        (error) => {
          console.error('Error updating category:', error);
        }
      );
    }
  }

  openEditName(): void {
    const dialogRef1 = this.dialog.open(EditCategoryNameComponent, {
      width: '300px',
      data: { category: this.data.category }
    });
    dialogRef1.afterClosed()
      .subscribe((data) => {
        if (data) {
          this.dialogRef.close(true);
        }
      })
  }

  get amount() {
    return this.transactionFormGroup.get('transactions');
  }

}
