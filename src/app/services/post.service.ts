import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from '../models/post.model';
import { pluck } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  readonly postRoute : string = '/posts';

  constructor(private http: HttpClient) { }

  getPosts(searchAtt: Object) : Observable<Post[]> {
    return this.http.post<Post[]>(environment.server + this.postRoute, searchAtt).pipe(pluck('result'));
  }
}
