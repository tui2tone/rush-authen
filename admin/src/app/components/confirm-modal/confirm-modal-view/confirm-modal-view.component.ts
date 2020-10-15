import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal-view',
  templateUrl: './confirm-modal-view.component.html',
  styleUrls: ['./confirm-modal-view.component.scss']
})
export class ConfirmModalViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }

}
