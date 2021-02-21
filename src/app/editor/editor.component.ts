import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, noop } from 'rxjs';
import { Post, Status } from '../models/post.model';
import { User } from '../models/user.model';
import { AppCommonService } from '../services/app-common.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  approvedPosts: Array<Post>; 
  pendingPosts: Array<Post>; 
  currentUser: User = { email: "Loading", name: "Loading"}; 

  constructor(
    private postService : PostService,
    public appCommonService: AppCommonService
  ){}

  ngOnInit(): void {
    this.appCommonService.currentUser$.subscribe((user: User) => {
      this.currentUser = user;
      this.postService.setHttpHeader(user.idToken)
    })
    this.getPosts([{propName : "status", value: Status.APPROVED}]).subscribe((result: Post[]) => this.approvedPosts = result);
    this.getPosts([{propName : "status", value: Status.PENDING}]).subscribe((result: Post[]) => this.pendingPosts = result);
  }

  getPosts(searchQuery: Object){
    return this.postService.getPosts(searchQuery)
  }


  updatePost(postId:string, newStatus: string ){
    let status : Status = Status[newStatus];
    this.postService.updateStatus(postId, status).subscribe((result: Post) => {
      let index = this.pendingPosts.findIndex((element: Post) => element._id == postId );
      if( index > -1){
        this.pendingPosts[index].status = status;
        this.approvedPosts.push(this.pendingPosts[index]);
        this.pendingPosts.splice(index, 1);
        
      }
    })
  }

  ngOnDestroy(): void {
  }
}
