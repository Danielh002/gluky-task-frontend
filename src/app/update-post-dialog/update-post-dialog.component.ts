import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-post-dialog',
  templateUrl: './update-post-dialog.component.html',
  styleUrls: ['./update-post-dialog.component.css']
})
export class UpdatePostDialogComponent implements OnInit {

  updatePostForm: FormGroup;
  postTitle: string = '';
  postContent: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.updatePostForm = this.fb.group({
      postTitle: data.postTitle ?? '',
      postContent: data.postContent ?? ''
    });
  }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.updatePostForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
