import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment, Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  post : Post;

  @Input()
  user: User;
  
  showComment: boolean = false;
  addCommentForm: FormGroup;




  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.addCommentForm = new FormGroup({
      commentContent: new FormControl('', [Validators.required, Validators.minLength(1),]),
    });
  }

  addComment(): void{
    if(this.addCommentForm.valid){
      let newComment: Comment = { _id: this.post._id, author:this.user.name, comment: this.addCommentForm.get('commentContent').value, createdAt: new Date()}
      this.postService.addComment(this.post._id, newComment).subscribe((_) => {
        this.post.comments.push(newComment)
      })
    }
  }
}
