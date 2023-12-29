import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/common/category';

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.css']
})
export class ConfirmDeletionComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { category: Category },
    public dialogRef: MatDialogRef<ConfirmDeletionComponent>) { }

  confirmDeletion(result: boolean) {
    this.dialogRef.close(result);
  }

}
