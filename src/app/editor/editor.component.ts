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
  _subs: Subscription = new Subscription();
  approvedPost: Array<Post>; 
  pendingPost: Array<Post>; 
  addPostForm: FormGroup;
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
    this.getPosts([{propName : "status", value: Status.APPROVED}]).subscribe((result: Post[]) => this.approvedPost = result);
    this.getPosts([{propName : "status", value: Status.PENDING}]).subscribe((result: Post[]) => this.pendingPost = result);

    this.addPostForm = new FormGroup({
      postTittle: new FormControl('', [Validators.required, Validators.minLength(1),]),
      postContent: new FormControl('', [Validators.required, Validators.minLength(1),]),
    });

  }

  getPosts(searchQuery: Object){
    return this.postService.getPosts(searchQuery)
  }

  addPost(){
    if(this.addPostForm.valid){
      this.postService.addPost(this.currentUser._id, this.addPostForm.get('postTittle').value, this.addPostForm.get('postContent').value,  Status.APPROVED).subscribe((result : Post) => this.approvedPost.push(result))
    }
  }

  updatePost(postId:string, newStatus: string ){
    let status : Status = Status[newStatus];
    this.postService.updateStatus(postId, status).subscribe((result: Post) => {
      let index = this.pendingPost.findIndex((element: Post) => element._id == postId );
      if( index > -1){
        console.log(this.pendingPost);
        console.log(index);
        this.pendingPost[index].status = status;
        this.approvedPost.push(this.pendingPost[index]);
        this.pendingPost.splice(index, 1);
        
      }
    })
  }



  ngOnDestroy(): void {
  }
}
