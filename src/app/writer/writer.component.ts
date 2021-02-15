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
  deniedPost$: Observable<Array<Post>>; 
  
  constructor(private postService : PostService) { }

  ngOnInit(): void {
    this.approvedPost$ = this.getPosts([{"status" : Status.APPROVED}]);
    this.deniedPost$ = this.getPosts([{"status" : Status.DENIED}]);
    this._subs.add(this.approvedPost$.subscribe(noop));
    this._subs.add(this.deniedPost$.subscribe(noop)); 
  }

  getPosts(searchQuery: Object){
    return this.postService.getPosts(searchQuery)
  }

  addPost(){
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe()
  }
}
