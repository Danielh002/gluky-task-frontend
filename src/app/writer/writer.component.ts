import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post, Status } from '../models/post.model';
import { PostService } from '../services/post.service';
import { noop, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css']
})
export class WriterComponent implements OnInit, OnDestroy {
  _subs: Subscription = new Subscription();
  approvedPost$: Observable<Array<Post>>; 
  pendingPost$: Observable<Array<Post>>; 
  
  constructor(private postService : PostService) { }

  ngOnInit(): void {
    this.approvedPost$ = this.getPosts([{"status" : Status.PENDING}]);
    this.pendingPost$ = this.getPosts([{"status" : Status.PENDING}]);
    this._subs.add(this.approvedPost$.subscribe(noop));
    this._subs.add(this.pendingPost$.subscribe(noop)); 
  }

  getPosts(searchQuery: Object){
    return this.postService.getPosts(searchQuery)
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe()
  }
}
