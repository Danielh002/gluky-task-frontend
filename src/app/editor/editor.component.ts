import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, noop } from 'rxjs';
import { Post, Status } from '../models/post.model';
import { User } from '../models/user.model';
import { AppCommonService } from '../services/app-common.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  _subs: Subscription = new Subscription();
  approvedPost$: Observable<Array<Post>>; 
  pendingPost$: Observable<Array<Post>>; 
  addPostForm: FormGroup;
  currentUser: User = { email: "Loading", name: "Loading"}; 

  constructor(
    private postService : PostService,
    public appCommonService: AppCommonService
  ){}

  ngOnInit(): void {
    console.log("EDITOR VIEW CHARING");
    this.appCommonService.currentUser$.subscribe((user: User) => {
      this.currentUser = user;
      this.postService.setHttpHeader(user.idToken)
    })

    this.approvedPost$ = this.getPosts([{propName : "status", value: Status.APPROVED}]);
    this.pendingPost$ = this.getPosts([{propName : "status", value: Status.PENDING}]);
    this._subs.add(this.approvedPost$.subscribe(noop));
    this._subs.add(this.pendingPost$.subscribe(noop)); 
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
      this.postService.addPost(this.currentUser._id, this.addPostForm.get('postTittle').value, this.addPostForm.get('postContent').value,  Status.APPROVED).subscribe((noop))
    }
  }

  updatePost(postId:string, newStatus: string ){
    let status : Status = Status[newStatus];
    if(this.addPostForm.valid){
      this.postService.updateStatus(postId, status).subscribe((noop))
    }
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe()
  }
}
