import { Component, OnInit } from '@angular/core';
import { Post, Status } from '../models/post.model';
import { Roles, User } from '../models/user.model';
import { AppCommonService } from '../services/app-common.service';
import { PostService } from '../services/post.service';
import { uniqueNamesGenerator, adjectives, colors, animals } from  'unique-names-generator';


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
    let randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
      length: 2
    });

    this.currentUser = {
      name: randomName,
      email: randomName+'@gmail.com',
      role: Roles.NO_AUTH
    }

    this.appCommonService.currentUser$.subscribe((user: User) => {
      this.currentUser = user;
      this.postService.setHttpHeader(user.idToken)
    });

    this.appCommonService.updateUser(this.currentUser);

    this.getPosts([{ propName: "status", value: Status.APPROVED }])
      .subscribe((result: Post[]) => this.approvedPosts = result);
  }

  getPosts(searchQuery: Object) {
    return this.postService.getPosts(searchQuery)
  }
}
