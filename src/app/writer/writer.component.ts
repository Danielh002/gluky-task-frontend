import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post, Status } from '../models/post.model';
import { PostService } from '../services/post.service';
import { AppCommonService } from '../services/app-common.service';
import { User } from '../models/user.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdatePostDialogComponent } from '../update-post-dialog/update-post-dialog.component';


@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css']
})
export class WriterComponent implements OnInit, OnDestroy {
  approvedPosts: Array<Post> = []; 
  deniedPosts: Array<Post> = []; 
  currentUser: User = { email: "Loading", name: "Loading"}; 
  
  constructor(
    private postService : PostService, 
    public appCommonService: AppCommonService, 
    private matDialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.appCommonService.currentUser$.subscribe((user: User) => {
      this.currentUser = user;
      this.postService.setHttpHeader(user.idToken)
    })
    this.getPosts([{propName : "status", value: Status.APPROVED}]).subscribe((result: Post[]) => this.approvedPosts = result);
    this.getPostsByStatusAndEmail( Status.DENIED, this.currentUser.email).subscribe((result: Post[]) => {
      this.deniedPosts = result;
    })
  }

  getPosts(searchQuery: Object){
    return this.postService.getPosts(searchQuery)
  }

  getPostsByStatusAndEmail(status: Status, email: string){
    return this.postService.getPostsByStatusAndEmail(status, email)
  }


  openUpdateDialog(postId: string){
    let index = this.deniedPosts.findIndex((element: Post) => element._id == postId );
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      postTitle: this.deniedPosts[index].tittle ?? '',
      postContent: this.deniedPosts[index].content ?? ''
    }
    const dialogRef = this.matDialog.open(UpdatePostDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          let newTitle : string = data.description as string;
          let newContent: string = data.selectedvalue as string;
          this.updatePost(postId, newTitle, newContent)
        }
      }
    , (error) => console.log(error));
  }

  updatePost(postId:string, newTitle: string, newContent: string ){
    this.postService.updateContentTitle(postId, newTitle, newContent).subscribe((_) => {
      let index = this.deniedPosts.findIndex((element: Post) => element._id == postId );
      if( index > -1){
        this.deniedPosts[index].status = Status.PENDING,
        this.deniedPosts.splice(index, 1);
      }
    }, (error) => console.log(error))
  }

  ngOnDestroy(): void {
  }
}
