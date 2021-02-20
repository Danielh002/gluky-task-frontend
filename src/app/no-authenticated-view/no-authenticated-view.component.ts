import { Component, OnInit } from '@angular/core';
import { Post, Status } from '../models/post.model';
import { User } from '../models/user.model';
import { AppCommonService } from '../services/app-common.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-no-authenticated-view',
  templateUrl: './no-authenticated-view.component.html',
  styleUrls: ['./no-authenticated-view.component.css']
})
export class NoAuthenticatedViewComponent implements OnInit {
  approvedPosts: Array<Post>;
  currentUser: User;

  constructor(
    private postService: PostService,
    public appCommonService: AppCommonService
  ) { }

  ngOnInit(): void {
    this.appCommonService.currentUser$.subscribe((user: User) => {
      this.currentUser = user;
      this.postService.setHttpHeader(user.idToken)
    });
    this.getPosts([{ propName: "status", value: Status.APPROVED }])
      .subscribe((result: Post[]) => this.approvedPosts = result);
  }

  getPosts(searchQuery: Object) {
    return this.postService.getPosts(searchQuery)
  }
}
