import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Post, Status } from '../../models/post.model';
import { User } from '../../models/user.model';
import { AppCommonService } from '../../services/app-common.service';
import { PostService } from '../../services/post.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  readonly successfulAdd: string = "Post created wait for your approval!"

  @Input()
  posts: Post[];

  @Input()
  user: User;

  addPostForm: FormGroup;

  constructor(
    private postService: PostService,
    public appCommonService: AppCommonService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.addPostForm = new FormGroup({
      postTittle: new FormControl('', [Validators.required, Validators.minLength(1),]),
      postContent: new FormControl('', [Validators.required, Validators.minLength(1),]),
    });
  }

  addPost() {
    if (this.addPostForm.valid) {
      this.postService.addPost(this.user._id, this.addPostForm.get('postTittle').value, this.addPostForm.get('postContent').value, Status.PENDING).subscribe((_) =>this.openConfirmationDialog());
    }
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe((_) => {
      let index = this.posts.findIndex((element: Post) => element._id == postId );
      this.posts.splice(index,1);
    })
  }

  openConfirmationDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dialogContent : this.successfulAdd
    }
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((_) => {
      this.addPostForm.reset();
    })
  }
}
