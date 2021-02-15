import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, Observable, noop } from 'rxjs';
import { Post, Status } from '../models/post.model';
import { PostService } from '../services/post.service';

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

  constructor(private postService : PostService) { }

  ngOnInit(): void {
    this.approvedPost$ = this.getPosts([{"status" : Status.APPROVED}]);
    this.pendingPost$ = this.getPosts([{"status" : Status.PENDING}]);
    this._subs.add(this.approvedPost$.subscribe(noop));
    this._subs.add(this.pendingPost$.subscribe(noop)); 
    this.addPostForm = new FormGroup({
      postTittle: new FormControl(''),
      postContent: new FormControl(''),
    });
  }

  getPosts(searchQuery: Object){
    return this.postService.getPosts(searchQuery)
  }

  addPost(){
    console.log(this.addPostForm.get('postTittle').value);
    console.log(this.addPostForm.get('postContent').value);
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe()
  }
}
