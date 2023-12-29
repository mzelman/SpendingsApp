import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDeletionComponent } from '../confirm-deletion/confirm-deletion.component';

@Component({
  selector: 'app-confirm-transaction-deletion',
  templateUrl: './confirm-transaction-deletion.component.html',
  styleUrls: ['./confirm-transaction-deletion.component.css']
})
export class ConfirmTransactionDeletionComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDeletionComponent>){}

confirmDeletion(result : boolean) {
this.dialogRef.close(result);

}

}
