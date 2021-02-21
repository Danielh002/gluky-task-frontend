import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdatePostDialogComponent } from 'src/app/update-post-dialog/update-post-dialog.component';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  dialogContent: string = '';

  constructor(
    private dialogRef: MatDialogRef<UpdatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.dialogContent = data.dialogContent;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
