import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comment, Post, Status } from '../models/post.model';
import { pluck } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  readonly postsRoute : string = '/posts';
  readonly postRoute : string = '/post';
  private  _httpHeader : HttpHeaders;

  constructor(private http: HttpClient) {
    this._httpHeader = new HttpHeaders();
  }

  setHttpHeader(idToken: string) {
    this._httpHeader= new HttpHeaders({
      'token' : idToken
    })
  }


  getPosts(searchAtt: Object) : Observable<Post[]> {
    return this.http.post<Post[]>(environment.server + this.postsRoute, searchAtt).pipe(pluck('result'));
  }

  getPostsByStatusAndEmail(status: Status, email: string) : Observable<Post[]> {
    return this.http.get<Post[]>(environment.server + this.postsRoute + '/' + status + '/' + email ).pipe(pluck('result'));
  }

  addPost(author: string, title: string, content: string, status: Status) : Observable<Post> {
    let newPost : Post = { author: author,  content: content , tittle: title, status: status  }
    return this.http.post<Post[]>(environment.server + this.postRoute, newPost, { headers: this._httpHeader}).pipe(pluck('result'));
  }

  updateStatus(postId: string, newStatus: Status) : Observable<Post> {
    let updateOp = [{"propName" : "status", "value": newStatus}]
    return this.http.patch<Post[]>(environment.server + this.postRoute + '/' + postId, updateOp, { headers: this._httpHeader}).pipe(pluck('result'));
  }

  deletePost(postId: string) : Observable<Post> {
    return this.http.delete<Post[]>(environment.server + this.postRoute + '/' + postId, { headers: this._httpHeader}).pipe(pluck('result'));
  }

  updateContentTitle(postId: string, newTitle: string, newContent: string) : Observable<Post> {
    let updateOp = [
      {"propName" : "tittle", "value": newTitle},
      {"propName" : "content", "value": newContent},
      {"propName" : "status", "value": Status.PENDING},
    ];
    return this.http.patch<Post>(environment.server + this.postRoute + '/' + postId, updateOp, { headers: this._httpHeader}).pipe(pluck('result'));
  }

  addComment( postId: string, newComment: Comment) : Observable<Post> {
    return this.http.post<Post>(environment.server + this.postRoute + '/' + postId, newComment).pipe(pluck('result'));
  }
}
