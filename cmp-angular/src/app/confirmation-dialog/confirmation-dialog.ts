import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.html',
})
export class ConfirmationDialog implements OnInit {

  yesCallback: Function;
  noCallback: Function;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogRef.disableClose = true;
    this.yesCallback = data.yesCallback;
    this.noCallback = data.noCallback ? data.noCallback : () => { };
    this.title = data.title ? data.title : null;//use default
  }

  ngOnInit() { }

  yes() {
    this.yesCallback();
    this.close();
  }

  no() {
    this.noCallback();
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

}
