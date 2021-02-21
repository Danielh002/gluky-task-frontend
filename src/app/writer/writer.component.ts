import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post, Status } from '../models/post.model';
import { PostService } from '../services/post.service';
import { AppCommonService } from '../services/app-common.service';
import { User } from '../models/user.model';


@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css']
})
export class WriterComponent implements OnInit, OnDestroy {
  approvedPost: Array<Post>; 
  deniedPost: Array<Post>; 
  currentUser: User = { email: "Loading", name: "Loading"}; 
  
  constructor(
    private postService : PostService, 
    public appCommonService: AppCommonService) { }

  ngOnInit(): void {
    this.getPosts([{propName : "status", value: Status.APPROVED}]).subscribe((result: Post[]) => this.approvedPost = result);
    this.getPosts([{propName : "status", value: Status.DENIED}]).subscribe((result: Post[]) => this.deniedPost = result);
  }

  getPosts(searchQuery: Object){
    return this.postService.getPosts(searchQuery)
  }

  updatePost(postId:string, newStatus: string ){
    let status : Status = Status[newStatus];
    this.postService.updateStatus(postId, status).subscribe((_) => {
      let index = this.deniedPost.findIndex((element: Post) => element._id == postId );
      if( index > -1){
        this.deniedPost[index].status = status;
        this.deniedPost.splice(index, 1);
      }
    })
  }

  ngOnDestroy(): void {
  }
}
