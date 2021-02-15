import { Component, OnInit } from '@angular/core';
import { Post, Status } from '../models/post.model';
import { PostService } from '../services/post.service';
import { Response } from '../models/response.model';


@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css']
})
export class WriterComponent implements OnInit {

  posts: Array<Post>; 

  constructor(private postService : PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    let findPost = [
      {"status" : Status.APPROVED}
    ]
    this.postService.getPost(findPost).subscribe(
      (response: Response<Post[]>) => {
        this.posts = response.result;
      }
    )
  }
}
